const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Get the new values from the command line arguments
const newValueE = process.argv[2] === 'true'; // Convert to boolean
const newValueL = process.argv[3];
const encryptionKey = process.argv[4];
const encryptionIv = process.argv[5];


// Encryption settings
const algorithm = 'aes-256-cbc';
const key = Buffer.from(encryptionKey, 'utf8');
const iv = Buffer.from(encryptionIv, 'utf8');

// Encrypt the value
function encrypt(text, crypto_key, crypto_iv) {
  const cipher = crypto.createCipheriv(algorithm, crypto_key, crypto_iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}


// Path to the JSON file in the repository
const jsonFilePath = path.join(__dirname, '../../locations_conf.json');

// Read the JSON file
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Update the JSON values
jsonData.locations_e = newValueE;
jsonData.locations_l = encrypt(newValueL, key, iv);

// Write the updated JSON back to the file
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
