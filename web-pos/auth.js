import { auth } from "./firebase-init.js";
import {
    GoogleAuthProvider,
    browserLocalPersistence,
    browserSessionPersistence,
    onAuthStateChanged,
    setPersistence,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const googleProvider = new GoogleAuthProvider();

function getRememberMe() {
    const checkbox = document.getElementById('rememberMe');
    return Boolean(checkbox && checkbox.checked);
}

async function applyPersistence() {
    const rememberMe = getRememberMe();
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
}

async function signInWithGoogle() {
    await applyPersistence();
    return await signInWithPopup(auth, googleProvider);
}

async function logOut() {
    await signOut(auth);
    window.location.href = 'login.html';
}

function fillUserHeader(user) {
    const nameEl = document.getElementById('userName');
    const metaEl = document.getElementById('userMeta');

    if (nameEl) {
        nameEl.textContent = user.displayName || user.email || 'Signed in user';
    }

    if (metaEl) {
        metaEl.textContent = `Signed in as: ${user.email || 'Unknown'}${getRememberMe() ? ' (remembered)' : ''}`;
    }
}

function requireAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.replace('login.html');
            return;
        }

        fillUserHeader(user);
    });
}

function wireLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn') || document.querySelector('.logout-btn');
    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener('click', async () => {
        try {
            await logOut();
        } catch (error) {
            console.error('Logout failed:', error);
            window.location.href = 'login.html';
        }
    });
}

function initLoginPage() {
    const loginBtn = document.getElementById('googleLoginBtn');
    const statusEl = document.getElementById('loginStatus');
    const rememberMe = document.getElementById('rememberMe');

    if (!loginBtn) {
        return;
    }

    const syncButtonText = () => {
        if (rememberMe && rememberMe.checked) {
            loginBtn.textContent = 'Continue with Google';
        } else {
            loginBtn.textContent = 'Sign in with Google';
        }
    };

    rememberMe?.addEventListener('change', syncButtonText);
    syncButtonText();

    loginBtn.addEventListener('click', async () => {
        loginBtn.disabled = true;
        statusEl.textContent = 'Signing in...';

        try {
            await signInWithGoogle();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Google sign-in failed:', error);
            statusEl.textContent = 'Google sign-in failed. Please try again.';
        } finally {
            loginBtn.disabled = false;
        }
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.replace('index.html');
        }
    });
}

const page = document.body?.dataset?.page;

if (page === 'login') {
    document.addEventListener('DOMContentLoaded', initLoginPage);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        requireAuth();
        wireLogoutButton();
    });
}

export { auth, signInWithGoogle, logOut, requireAuth };
