#!/usr/bin/env node

import crypto from "crypto";
import fs from "fs";
import path from "path";

console.log("🔐 Updating strapi/.env with secure secrets...\n");

// Generate secure secrets
const generateSecret = (length = 32) => {
  return crypto.randomBytes(length).toString("base64");
};

const secrets = {
  JWT_SECRET: generateSecret(32),
  ADMIN_JWT_SECRET: generateSecret(32),
  APP_KEYS: `"${generateSecret(32)},${generateSecret(32)}"`,
  API_TOKEN_SALT: generateSecret(32),
  TRANSFER_TOKEN_SALT: generateSecret(32),
};

// Read the current .env file
const envPath = path.join(process.cwd(), "strapi", ".env");
let envContent = "";

try {
  envContent = fs.readFileSync(envPath, "utf8");
} catch (error) {
  console.error("❌ Error reading strapi/.env file:", error.message);
  process.exit(1);
}

// Update the secrets in the content
let updatedContent = envContent;

Object.entries(secrets).forEach(([key, value]) => {
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (regex.test(updatedContent)) {
    updatedContent = updatedContent.replace(regex, `${key}=${value}`);
    console.log(`✅ Updated ${key}`);
  } else {
    console.log(`⚠️  ${key} not found in .env file`);
  }
});

// Write the updated content back
try {
  fs.writeFileSync(envPath, updatedContent, "utf8");
  console.log("\n✅ strapi/.env updated successfully with secure secrets!");
  console.log(
    "🔒 All placeholder values have been replaced with secure random secrets."
  );
} catch (error) {
  console.error("❌ Error writing to strapi/.env file:", error.message);
  process.exit(1);
}
