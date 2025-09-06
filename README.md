# Vikyath Naradasi's Personal Portfolio

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.5.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Security-orange)

A modern, AI-powered personal portfolio showcasing my work as an AI Engineer and Full-Stack Developer. Features interactive AI chat, real-time image classification, and a comprehensive project showcase.

🌐 **Live Demo**: [vikyath.me](https://vikyath.me)

## ✨ Features

### 🤖 AI-Powered Features
- **AI Chat Assistant**: Interactive chatbot that answers questions about my background, experience, and projects
- **AI Playground**: Real-time image classification using TensorFlow.js and MobileNet
- **Smart Resume**: Interactive résumé with dynamic content loading

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Theme**: Automatic theme switching with user preference
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

### 🚀 Performance & Security
- **Firebase Hosting**: Global CDN with automatic scaling
- **Cloudflare Security**: DDoS protection and SSL/TLS encryption
- **Static Generation**: Fast loading with Next.js static export
- **Optimized Assets**: Automatic image optimization and code splitting

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### AI & ML
- **TensorFlow.js** - Client-side machine learning
- **OpenRouter** - AI model API gateway
- **MobileNet** - Pre-trained image classification model

### Backend & Infrastructure
- **Firebase Hosting** - Global content delivery
- **Cloudflare** - Security and performance
- **GitHub Actions** - CI/CD automation

## 📁 Project Structure

```
personal-website/
├── ai-portfolio/                 # Next.js application
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── (site)/           # Main site pages
│   │   │   │   ├── playground/   # AI playground page
│   │   │   │   ├── projects/     # Projects showcase
│   │   │   │   └── resume/       # Interactive resume
│   │   │   ├── api/              # API routes
│   │   │   │   ├── ask/          # AI chat endpoint
│   │   │   │   └── openrouter/   # OpenRouter proxy
│   │   │   └── globals.css       # Global styles
│   │   ├── components/           # Reusable components
│   │   │   ├── chat/             # AI chat component
│   │   │   ├── hero.tsx          # Hero section
│   │   │   ├── projects/         # Project components
│   │   │   └── ui/               # shadcn/ui components
│   │   └── lib/                  # Utility libraries
│   ├── content/                  # Static content
│   │   ├── projects.json         # Project data
│   │   └── resume.json           # Resume data
│   ├── firebase.json             # Firebase config
│   └── package.json              # Dependencies
├── firebase.json                 # Root Firebase config
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vikyath/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   cd ai-portfolio
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the `ai-portfolio` directory:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_DEFAULT_MODEL=moonshotai/kimi-k2:free
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Deployment
```bash
npm run export       # Export static files
npm run deploy       # Build and deploy to Firebase
npm run preview      # Preview production build
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firebase Hosting
3. Download service account key
4. Add to GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT`

### Cloudflare Setup
1. Add your domain to Cloudflare
2. Point DNS to Firebase hosting
3. Enable SSL/TLS encryption
4. Configure security settings

### AI Integration
- **OpenRouter**: Sign up at [openrouter.ai](https://openrouter.ai)
- **Models**: Configure free and premium models in environment variables
- **Rate Limits**: Monitor usage through OpenRouter dashboard

## 📡 API Endpoints

### AI Chat
```
POST /api/ask
Content-Type: application/json

{
  "question": "What is Vikyath's background?"
}
```

### OpenRouter Proxy
```
GET /api/openrouter/key
POST /api/openrouter/chat/completions
```

### Project Data
```
GET /api/project-view
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key | Yes |
| `OPENROUTER_DEFAULT_MODEL` | Default AI model | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO | Yes |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase credentials | Deployment |

## 🚢 Deployment

### Automatic Deployment (Recommended)
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site updates in ~2-3 minutes

### Manual Deployment
```bash
cd ai-portfolio
npm run build
npm run deploy
```

### Environment Setup
Add these secrets to GitHub repository:
- `FIREBASE_SERVICE_ACCOUNT`
- `OPENROUTER_API_KEY`
- `OPENROUTER_DEFAULT_MODEL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow ESLint configuration
- Write descriptive commit messages
- Test on multiple devices/browsers
- Update documentation as needed

## 📊 Performance

### Lighthouse Scores (Typical)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Bundle Analysis
- **First Load**: ~150KB gzipped
- **Subsequent Loads**: ~50KB gzipped
- **Images**: Automatically optimized
- **Fonts**: Self-hosted and optimized

## 🔍 SEO & Analytics

### Meta Tags
- Dynamic Open Graph images
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration

### Monitoring
- Firebase Analytics integration
- Cloudflare Web Analytics
- Error tracking with Sentry
- Performance monitoring

## 🐛 Troubleshooting

### Common Issues

**AI Chat Not Working**
- Check OpenRouter API key
- Verify environment variables
- Check browser console for errors

**Build Failures**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

**Deployment Issues**
- Check Firebase service account permissions
- Verify GitHub secrets are configured
- Check GitHub Actions logs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Vikyath Naradasi**
- Website: [vikyath.me](https://vikyath.me)
- LinkedIn: [linkedin.com/in/vikyathnaradasi](https://www.linkedin.com/in/vikyathnaradasi/)
- GitHub: [github.com/Vikyath-N](https://github.com/Vikyath-N/)
- Email: please don't 

---

⭐ **Star this repo** if you found it helpful!