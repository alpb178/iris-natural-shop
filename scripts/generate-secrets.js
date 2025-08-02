const crypto = require("crypto");

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString("base64");
}

function generateAppKeys(count = 2) {
  return Array.from({ length: count }, () => generateSecret()).join(",");
}

console.log("Generated Strapi Security Keys:");
console.log("================================");
console.log(`JWT_SECRET=${generateSecret()}`);
console.log(`ADMIN_JWT_SECRET=${generateSecret()}`);
console.log(`APP_KEYS=${generateAppKeys()}`);
console.log(`API_TOKEN_SALT=${generateSecret()}`);
console.log(`TRANSFER_TOKEN_SALT=${generateSecret()}`);
console.log("\nCopy these values to your .env file for production deployment.");
