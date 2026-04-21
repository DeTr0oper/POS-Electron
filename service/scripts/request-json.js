const http = require("http");
const { loadConfig } = require("../config");

function requestJson(method, pathname, payload) {
  const config = loadConfig();
<<<<<<< HEAD
  const data = payload ? JSON.stringify(payload) : "";
=======
  const body = payload ? JSON.stringify(payload) : "";
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)

  return new Promise((resolve, reject) => {
    const req = http.request({
      host: config.host,
      port: config.port,
      path: pathname,
      method,
      headers: {
        "Content-Type": "application/json",
<<<<<<< HEAD
        "Content-Length": Buffer.byteLength(data)
=======
        "Content-Length": Buffer.byteLength(body)
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)
      }
    }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const raw = Buffer.concat(chunks).toString("utf8");
        try {
          resolve(JSON.parse(raw));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", reject);

<<<<<<< HEAD
    if (data) {
      req.write(data);
=======
    if (body) {
      req.write(body);
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)
    }

    req.end();
  });
}

module.exports = {
  requestJson
};
