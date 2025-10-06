# Deployment Guide for Kenkai Labs Website

## 🚀 Quick Start with Vercel (Recommended)

### Step 1: Prepare for Deployment
1. Ensure your code is pushed to GitHub
2. Test the production build locally:
   ```bash
   npm run build
   npm run start
   ```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your `kenkai` repository
5. Vercel will auto-detect Next.js settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Custom Domain Setup
1. In Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain (e.g., `kenkailabs.com`)
4. Update your domain's DNS records:
   - **Type**: CNAME
   - **Name**: www (or @)
   - **Value**: `cname.vercel-dns.com`
5. SSL certificate will be automatically provisioned

## 🌐 Alternative Deployment Options

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out` (you'll need to add `output: 'export'` to next.config.ts)

### Railway
1. Go to [railway.app](https://railway.app)
2. Deploy from GitHub
3. Automatic Next.js detection
4. Custom domain in project settings

### Traditional VPS/Server
If you prefer managing your own server:
1. Use services like DigitalOcean, AWS EC2, or Linode
2. Install Node.js and npm
3. Clone repository and run:
   ```bash
   npm install
   npm run build
   npm run start
   ```
4. Use PM2 for process management
5. Set up Nginx as reverse proxy
6. Configure SSL with Let's Encrypt

## 📋 Pre-Deployment Checklist

- [ ] All code committed and pushed to GitHub
- [ ] Production build works locally (`npm run build && npm run start`)
- [ ] Environment variables configured (if any)
- [ ] Custom domain purchased and ready
- [ ] DNS access for domain configuration

## 🔧 Environment Variables (if needed later)
If you add environment variables, create them in your deployment platform:

**Vercel**: Project Settings → Environment Variables
**Netlify**: Site Settings → Environment Variables
**Railway**: Project Settings → Variables

## 📈 Post-Deployment Steps
1. Test all pages and functionality
2. Set up analytics (Google Analytics, Vercel Analytics)
3. Configure monitoring and error tracking
4. Set up automated backups if using database
5. Test contact forms and lead capture

## 🚀 Ready to Deploy?
The easiest path is Vercel. Your Next.js app is already configured perfectly for it!