const sodium = require('sodium-native');
const fs = require('fs');
const https = require('https');

// GitHub repository details
const owner = 'Vikyath-N';
const repo = 'Personal_Website';
const token = process.env.GITHUB_TOKEN;

// Read Firebase service account JSON
const firebaseJson = fs.readFileSync('personal-website-ef637-firebase-adminsdk-fbsvc-606d9da203.json', 'utf8');

// Get repository public key
function getPublicKey() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/actions/secrets/public-key`,
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Encrypt secret with repository public key
function encryptSecret(secret, publicKey) {
  const publicKeyBuffer = Buffer.from(publicKey, 'base64');
  const secretBuffer = Buffer.from(secret, 'utf8');
  
  const encrypted = Buffer.alloc(secretBuffer.length + sodium.crypto_box_SEALBYTES);
  sodium.crypto_box_seal(encrypted, secretBuffer, publicKeyBuffer);
  
  return encrypted.toString('base64');
}

// Update GitHub secret
function updateSecret(secretName, encryptedValue, keyId) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      encrypted_value: encryptedValue,
      key_id: keyId
    });

    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/actions/secrets/${secretName}`,
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Node.js',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${data}`);
        resolve(data);
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  try {
    console.log('Getting repository public key...');
    const { key, key_id } = await getPublicKey();
    
    console.log('Encrypting Firebase service account JSON...');
    const encrypted = encryptSecret(firebaseJson, key);
    
    console.log('Updating FIREBASE_SERVICE_ACCOUNT secret...');
    await updateSecret('FIREBASE_SERVICE_ACCOUNT', encrypted, key_id);
    
    console.log('✅ FIREBASE_SERVICE_ACCOUNT secret updated successfully!');
  } catch (error) {
    console.error('❌ Error updating secret:', error.message);
  }
}

main();
