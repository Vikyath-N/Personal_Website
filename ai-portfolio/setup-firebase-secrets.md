# 🔐 Firebase Service Account Setup Guide

## Step-by-Step Instructions

### 1. Generate Firebase Service Account Key

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `personal-website-ef637`

2. **Navigate to Service Accounts**
   - Click the gear icon (⚙️) → **Project Settings**
   - Go to **Service Accounts** tab

3. **Generate New Private Key**
   - Click **Generate New Private Key**
   - Click **Generate Key** in the confirmation dialog
   - Download the JSON file (e.g., `personal-website-ef637-firebase-adminsdk-xxxxx.json`)

### 2. Add GitHub Secrets

1. **Go to GitHub Repository**
   - Visit: https://github.com/Vikyath-N/Personal_Website/settings/secrets/actions

2. **Add Firebase Service Account Secret**
   - Click **New repository secret**
   - **Name**: `FIREBASE_SERVICE_ACCOUNT`
   - **Value**: Copy the entire JSON content from the downloaded file
   - Click **Add secret**

3. **Add OpenRouter Secrets**
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: Your OpenRouter API key (from .env.local)

   - **Name**: `OPENROUTER_DEFAULT_MODEL`
   - **Value**: `moonshotai/kimi-k2:free`

   - **Name**: `OPENROUTER_FREE_MODELS_GENERAL`
   - **Value**: `moonshotai/kimi-k2:free, z-ai/glm-4.5-air:free, google/gemma-3n-e2b-it:free, tencent/hunyuan-a13b-instruct:free`

   - **Name**: `OPENROUTER_FREE_MODELS_CODE`
   - **Value**: `qwen/qwen3-coder:free, openai/gpt-oss-20b:free, moonshotai/kimi-k2:free, google/gemma-3n-e2b-it:free`

### 3. Verify Setup

1. **Check Secrets**
   - Go to https://github.com/Vikyath-N/Personal_Website/settings/secrets/actions
   - Verify all 5 secrets are listed:
     - `FIREBASE_SERVICE_ACCOUNT`
     - `OPENROUTER_API_KEY`
     - `OPENROUTER_DEFAULT_MODEL`
     - `OPENROUTER_FREE_MODELS_GENERAL`
     - `OPENROUTER_FREE_MODELS_CODE`

2. **Test Deployment**
   - Make a small change to your code
   - Push to `main` branch
   - Check **Actions** tab for deployment status

### 4. Security Notes

- ✅ **Never commit** the Firebase service account JSON file
- ✅ **Delete** the downloaded JSON file after adding to GitHub secrets
- ✅ **Rotate** the service account key periodically
- ✅ **Monitor** GitHub Actions logs for any issues

### 5. Troubleshooting

**If deployment fails:**
1. Check the **Actions** tab for error messages
2. Verify the JSON format in `FIREBASE_SERVICE_ACCOUNT` secret
3. Ensure the Firebase project ID is correct (`personal-website-ef637`)
4. Check that the service account has hosting permissions

**Common Issues:**
- **Invalid JSON**: Make sure the entire JSON is copied without extra characters
- **Permission denied**: The service account needs Firebase Hosting permissions
- **Project not found**: Verify the project ID matches your Firebase project

### 6. Next Steps

Once secrets are configured:
1. Push any change to trigger the first deployment
2. Monitor the **Actions** tab for successful deployment
3. Visit your site at https://vikyath.me to verify it's working
4. Check Firebase Console for deployment history

## 🎯 Quick Checklist

- [ ] Downloaded Firebase service account JSON
- [ ] Added `FIREBASE_SERVICE_ACCOUNT` secret to GitHub
- [ ] Added `OPENROUTER_API_KEY` secret to GitHub
- [ ] Added `OPENROUTER_DEFAULT_MODEL` secret to GitHub
- [ ] Added `OPENROUTER_FREE_MODELS_GENERAL` secret to GitHub
- [ ] Added `OPENROUTER_FREE_MODELS_CODE` secret to GitHub
- [ ] Deleted the downloaded JSON file locally
- [ ] Pushed a change to test deployment
- [ ] Verified deployment in Actions tab
- [ ] Confirmed site is working at vikyath.me
