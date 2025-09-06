#!/bin/bash

# Script to update OpenRouter API key secret on GitHub
# Usage: ./update_openrouter_secret.sh "your-new-openrouter-api-key"

if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide your new OpenRouter API key as an argument"
    echo "Usage: $0 'sk-or-v1-xxxxxxxxxxxxxxxx'"
    exit 1
fi

NEW_API_KEY="$1"
REPO="Vikyath-N/Personal_Website"

echo "🔄 Updating OPENROUTER_API_KEY secret..."

# Get repository public key
PUBLIC_KEY_RESPONSE=$(gh api repos/$REPO/actions/secrets/public-key)
KEY_ID=$(echo $PUBLIC_KEY_RESPONSE | jq -r '.key_id')
PUBLIC_KEY=$(echo $PUBLIC_KEY_RESPONSE | jq -r '.key')

if [ -z "$KEY_ID" ] || [ -z "$PUBLIC_KEY" ]; then
    echo "❌ Failed to get repository public key"
    exit 1
fi

# Encrypt the API key using Node.js
ENCRYPTED_KEY=$(node -e "
const crypto = require('crypto');
const publicKey = Buffer.from('$PUBLIC_KEY', 'base64');
const secret = '$NEW_API_KEY';

const encrypted = crypto.publicEncrypt({
  key: publicKey,
  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  oaepHash: 'sha-256'
}, Buffer.from(secret));

console.log(encrypted.toString('base64'));
")

if [ -z "$ENCRYPTED_KEY" ]; then
    echo "❌ Failed to encrypt API key"
    exit 1
fi

# Update the secret
UPDATE_RESPONSE=$(gh api repos/$REPO/actions/secrets/OPENROUTER_API_KEY \
  -X PUT \
  -H "Content-Type: application/json" \
  -f encrypted_value="$ENCRYPTED_KEY" \
  -f key_id="$KEY_ID")

if [ $? -eq 0 ]; then
    echo "✅ OPENROUTER_API_KEY secret updated successfully!"
    echo "�� You may need to trigger a new deployment to use the new API key"
else
    echo "❌ Failed to update OPENROUTER_API_KEY secret"
    echo "Response: $UPDATE_RESPONSE"
    exit 1
fi
