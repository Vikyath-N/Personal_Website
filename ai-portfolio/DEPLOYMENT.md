# 🚀 GitHub Pages Deployment Guide

## Overview
This portfolio is configured to deploy automatically to GitHub Pages using GitHub Actions. The deployment happens whenever you push to the `main` branch.

## Architecture
```
GitHub Repository → GitHub Actions → GitHub Pages → vikyath.me
```

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Configure Custom Domain
1. In the same **Pages** settings, scroll down to **Custom domain**
2. Enter: `vikyath.me`
3. Check **Enforce HTTPS** (recommended)
4. Click **Save**

### 3. Update DNS Records
In your DNS provider (GoDaddy), update these records:

#### Option A: Apex Domain (vikyath.me)
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A  
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### Option B: CNAME (www.vikyath.me)
```
Type: CNAME
Name: www
Value: yourusername.github.io
TTL: 3600
```

### 4. Verify Domain
1. GitHub will automatically verify your domain
2. You'll see a green checkmark when verified
3. DNS propagation can take up to 24 hours

## Deployment Process

### Automatic Deployment
- Push to `main` branch → Automatic deployment
- Check **Actions** tab for deployment status
- Site updates in ~2-3 minutes

### Manual Deployment
```bash
# Build locally
npm run build

# Preview locally
npm run preview
```

## Environment Variables

### Required for Build
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `OPENROUTER_DEFAULT_MODEL` - Default model to use
- `NEXT_PUBLIC_SITE_URL` - Set to https://vikyath.me

### GitHub Secrets
Add these in **Settings** → **Secrets and variables** → **Actions**:
- `OPENROUTER_API_KEY`
- `OPENROUTER_DEFAULT_MODEL`
- `OPENROUTER_FREE_MODELS_GENERAL`
- `OPENROUTER_FREE_MODELS_CODE`

## File Structure
```
ai-portfolio/
├── .github/workflows/deploy.yml  # CI/CD pipeline
├── public/CNAME                  # Custom domain config
├── out/                          # Built static files
└── DEPLOYMENT.md                 # This guide
```

## Troubleshooting

### Build Failures
1. Check **Actions** tab for error logs
2. Verify all environment variables are set
3. Ensure `npm ci` runs successfully

### Domain Issues
1. Verify DNS records are correct
2. Check domain verification status in GitHub Pages settings
3. Wait for DNS propagation (up to 24 hours)

### SSL Certificate
- GitHub automatically provides SSL certificates
- Enable "Enforce HTTPS" in Pages settings
- Certificate provisioning can take a few minutes

## Benefits of This Setup
- ✅ **Free hosting** on GitHub Pages
- ✅ **Automatic deployments** on git push
- ✅ **Custom domain** support
- ✅ **HTTPS by default**
- ✅ **Global CDN** via GitHub's infrastructure
- ✅ **No vendor lock-in**
- ✅ **Version control** integration

## Migration from Firebase
1. Keep Firebase project as backup initially
2. Test GitHub Pages deployment thoroughly
3. Update DNS records when ready
4. Remove Firebase hosting when confirmed working

## Monitoring
- Check deployment status in **Actions** tab
- Monitor site performance via GitHub Pages analytics
- Set up uptime monitoring if needed
