#!/usr/bin/env node

import crypto from "crypto";

console.log("🔐 Generating secure secrets for Strapi...\n");

// Generate random secrets
const generateSecret = (length = 32) => {
  return crypto.randomBytes(length).toString("base64");
};

const secrets = {
  JWT_SECRET: generateSecret(32),
  ADMIN_JWT_SECRET: generateSecret(32),
  APP_KEYS: `${generateSecret(32)},${generateSecret(32)}`,
  API_TOKEN_SALT: generateSecret(32),
  TRANSFER_TOKEN_SALT: generateSecret(32),
};

console.log("📋 Generated secrets:");
console.log("=====================================");

Object.entries(secrets).forEach(([key, value]) => {
  console.log(`${key}=${value}`);
});

console.log("\n📝 Copy these values to your .env.dev file");
console.log(
  "⚠️  Keep these secrets secure and never commit them to version control"
);
console.log(
  "\n💡 You can also run this script and pipe it to update your .env.dev:"
);
console.log("   node scripts/generate-secrets.js >> .env.dev");
