# 🚀 Firebase + Cloudflare Deployment Guide

## Overview
This portfolio is configured to deploy automatically to Firebase Hosting using GitHub Actions. Firebase serves through Cloudflare for enhanced security and performance. The deployment happens whenever you push to the `main` branch.

## Architecture
```
GitHub Repository → GitHub Actions → Firebase Hosting → Cloudflare → vikyath.me
```

## Setup Instructions

### 1. Firebase Service Account Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `personal-website-ef637`
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file

### 2. Add GitHub Secrets
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `FIREBASE_SERVICE_ACCOUNT`: Paste the entire JSON content from step 1
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `OPENROUTER_DEFAULT_MODEL`: Default model (e.g., `moonshotai/kimi-k2:free`)
   - `OPENROUTER_FREE_MODELS_GENERAL`: Comma-separated list of free models
   - `OPENROUTER_FREE_MODELS_CODE`: Comma-separated list of code-focused models

### 3. Firebase Hosting Configuration
Your Firebase hosting is already configured in `firebase.json`:
- **Public directory**: `out` (Next.js static export)
- **Project ID**: `personal-website-ef637`
- **Custom domain**: Already configured through Cloudflare

### 4. Cloudflare Integration
Your current setup already includes:
- ✅ Cloudflare as DNS provider
- ✅ Cloudflare Turnstile for security
- ✅ Custom domain (vikyath.me) pointing to Firebase
- ✅ SSL/TLS encryption

## Deployment Process

### Automatic Deployment
- Push to `main` branch → Automatic deployment to Firebase
- Check **Actions** tab for deployment status
- Site updates in ~2-3 minutes
- Cloudflare automatically caches the new content

### Manual Deployment
```bash
# Build and deploy locally
cd ai-portfolio
npm run deploy

# Or just build for testing
npm run build
npm run preview
```

## Environment Variables

### Required for Build
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `OPENROUTER_DEFAULT_MODEL` - Default model to use
- `NEXT_PUBLIC_SITE_URL` - Set to https://vikyath.me

### GitHub Secrets
Add these in **Settings** → **Secrets and variables** → **Actions**:
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON
- `OPENROUTER_API_KEY`
- `OPENROUTER_DEFAULT_MODEL`
- `OPENROUTER_FREE_MODELS_GENERAL`
- `OPENROUTER_FREE_MODELS_CODE`

## File Structure
```
ai-portfolio/
├── .github/workflows/deploy.yml  # CI/CD pipeline
├── firebase.json                 # Firebase hosting config
├── .firebaserc                   # Firebase project config
├── out/                          # Built static files
└── DEPLOYMENT.md                 # This guide
```

## Troubleshooting

### Build Failures
1. Check **Actions** tab for error logs
2. Verify all environment variables are set
3. Ensure dependencies install successfully (`npm install`)
4. Check Firebase service account permissions

### Firebase Deployment Issues
1. Verify `FIREBASE_SERVICE_ACCOUNT` secret is correctly formatted
2. Check Firebase project ID matches `personal-website-ef637`
3. Ensure Firebase CLI is authenticated in the workflow

### Cloudflare Issues
1. Verify DNS records point to Firebase hosting
2. Check Cloudflare SSL/TLS settings
3. Monitor Cloudflare analytics for any issues

## Benefits of This Setup
- ✅ **Firebase hosting** with global CDN
- ✅ **Cloudflare security** with Turnstile protection
- ✅ **Automatic deployments** on git push
- ✅ **Custom domain** support (vikyath.me)
- ✅ **HTTPS by default** via Cloudflare
- ✅ **Enhanced security** with Cloudflare features
- ✅ **Version control** integration
- ✅ **Cost-effective** hosting solution

## Current Architecture Benefits
- **Firebase**: Reliable hosting with automatic scaling
- **Cloudflare**: Enhanced security, DDoS protection, and performance
- **GitHub Actions**: Automated CI/CD pipeline
- **Custom Domain**: Professional branding with vikyath.me

## Monitoring
- Check deployment status in **Actions** tab
- Monitor Firebase hosting analytics
- Use Cloudflare analytics for performance insights
- Set up uptime monitoring if needed
