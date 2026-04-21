const { ServiceError } = require("./errors");

<<<<<<< HEAD
function asOptionalString(value) {
=======
function getOptionalString(value) {
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)
  if (value == null || value === "") {
    return "";
  }

  if (typeof value !== "string") {
<<<<<<< HEAD
    throw new ServiceError("PAYLOAD_INVALID", "Optional text fields must be strings.", 400);
=======
    throw new ServiceError("PAYLOAD_INVALID", "Text fields must be strings.", 400);
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)
  }

  return value.trim();
}

function validateItem(item, index) {
  if (!item || typeof item !== "object") {
    throw new ServiceError("PAYLOAD_INVALID", `Item ${index + 1} must be an object.`, 400);
  }

<<<<<<< HEAD
  const qty = asOptionalString(item.qty);
  const name = asOptionalString(item.name);
  const price = asOptionalString(item.price);
=======
  const qty = getOptionalString(item.qty);
  const name = getOptionalString(item.name);
  const price = getOptionalString(item.price);
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)

  if (!qty || !name || !price) {
    throw new ServiceError("PAYLOAD_INVALID", `Item ${index + 1} must include qty, name, and price.`, 400);
  }

  return { qty, name, price };
}

function validatePrintPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new ServiceError("PAYLOAD_INVALID", "Request body must be a JSON object.", 400);
  }

<<<<<<< HEAD
  const storeName = asOptionalString(payload.storeName);
  const date = asOptionalString(payload.date);
  const total = asOptionalString(payload.total);
  const items = Array.isArray(payload.items) ? payload.items.map(validateItem) : null;

  if (!storeName || !date || !total || !items || items.length === 0) {
=======
  const items = Array.isArray(payload.items) ? payload.items.map(validateItem) : [];
  const storeName = getOptionalString(payload.storeName);
  const date = getOptionalString(payload.date);
  const total = getOptionalString(payload.total);

  if (!storeName || !date || !total || items.length === 0) {
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)
    throw new ServiceError(
      "PAYLOAD_INVALID",
      "Payload must include storeName, date, total, and at least one item.",
      400
    );
  }

  return {
<<<<<<< HEAD
    receiptId: asOptionalString(payload.receiptId),
    storeName,
    date,
    items,
    subtotal: asOptionalString(payload.subtotal),
    tax: asOptionalString(payload.tax),
    total,
    cash: asOptionalString(payload.cash),
    change: asOptionalString(payload.change),
    footer: asOptionalString(payload.footer)
=======
    receiptId: getOptionalString(payload.receiptId),
    storeName,
    address: getOptionalString(payload.address),
    phone: getOptionalString(payload.phone),
    date,
    items,
    subtotal: getOptionalString(payload.subtotal),
    tax: getOptionalString(payload.tax),
    total,
    cash: getOptionalString(payload.cash),
    change: getOptionalString(payload.change),
    footer: getOptionalString(payload.footer)
>>>>>>> 08d4f41 (Implement silent print service and receipt storage)
  };
}

module.exports = {
  validatePrintPayload
};
