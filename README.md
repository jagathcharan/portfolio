# Portfolio Website - Complete Setup Guide

A modern, responsive portfolio website showcasing expertise in Machine Learning, Computer Vision, Edge AI, and Real-time Video Analytics. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful gradient-based design with smooth animations
- **Responsive Design**: Fully responsive across all device sizes
- **AI Chat Integration**: Interactive AI assistant for portfolio inquiries
- **Performance Optimized**: Lazy loading, code splitting, and optimized builds
- **SEO Friendly**: Meta tags and semantic HTML structure
- **Sections**: Hero, About, Skills, Projects, Experience, Certifications, Contact, and Resume download

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **AI Services**: OpenAI, Gemini (via Supabase)
- **Deployment**: GitHub Pages

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Complete Setup Process](#complete-setup-process)
   - [Step 1: Install Prerequisites](#step-1-install-prerequisites)
   - [Step 2: Install Node Modules](#step-2-install-node-modules)
   - [Step 3: Run Development Server](#step-3-run-development-server)
   - [Step 4: Git Server Setup & Push](#step-4-git-server-setup--push)
   - [Step 5: Build for Production](#step-5-build-for-production)
   - [Step 6: Deploy to GitHub Pages](#step-6-deploy-to-github-pages)
   - [Step 7: Custom Domain Setup](#step-7-custom-domain-setup)
3. [Environment Variables](#environment-variables)
4. [Project Structure](#project-structure)
5. [Available Scripts](#available-scripts)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **GitHub Account** - [Sign up](https://github.com/)
- **GitHub CLI** (optional but recommended) - [Install](https://cli.github.com/)

---

## Complete Setup Process

### Step 1: Install Prerequisites

#### 1.1 Install Node.js

**On Ubuntu/WSL:**
```bash
# Update package list
sudo apt update

# Install Node.js (v18 or higher)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

**On Windows:**
- Download and install from [nodejs.org](https://nodejs.org/)
- Choose the LTS version (v18 or higher)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

#### 1.2 Install Git

**On Ubuntu/WSL:**
```bash
sudo apt install git
git --version
```

**On Windows:**
- Download from [git-scm.com](https://git-scm.com/)
- Or install via: `winget install Git.Git`

#### 1.3 Install GitHub CLI (Optional but Recommended)

**On Ubuntu/WSL:**
```bash
sudo apt install gh
gh --version
```

**On Windows:**
- Download from [cli.github.com](https://cli.github.com/)
- Or install via: `winget install GitHub.cli`

**Authenticate GitHub CLI:**
```bash
gh auth login
# Follow the prompts to authenticate via browser
```

---

### Step 2: Install Node Modules

#### 2.1 Navigate to Project Directory

```bash
# If you cloned the repository
cd your-repo-name

# Or if you're in the project directory already
pwd  # Verify you're in the correct directory
```

#### 2.2 Install Dependencies

```bash
# Install all dependencies from package.json
npm install

# This will:
# - Read package.json
# - Download all dependencies to node_modules/
# - Install devDependencies (gh-pages, vite, etc.)
# - Create package-lock.json
```

**Expected Output:**
```
added 250 packages, and audited 251 packages in 30s
```

**If you encounter errors:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 2.3 Verify Installation

```bash
# Check if node_modules exists
ls node_modules | head -5

# Verify key packages
npm list react react-dom vite
```

---

### Step 3: Run Development Server

#### 3.1 Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 3.2 Access Your Site

- Open your browser and go to: `http://localhost:5173`
- The site should load with hot-reload enabled
- Any changes you make will automatically refresh in the browser

#### 3.3 Stop Development Server

Press `Ctrl + C` in the terminal to stop the server.

#### 3.4 Preview Production Build Locally

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

This will show you exactly how your site will look when deployed.

---

### Step 4: Git Server Setup & Push

#### 4.1 Initialize Git Repository (If Not Already Done)

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

#### 4.2 Configure Git (First Time Only)

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

#### 4.3 Create .gitignore (Already Created)

The `.gitignore` file is already configured to exclude:
- `node_modules/`
- `.env` files
- Build outputs (`dist/`)
- Editor files
- OS files

#### 4.4 Stage and Commit Files

```bash
# Add all files to staging area
git add .

# Verify what will be committed
git status

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Verify commit was created
git log --oneline -1
```

#### 4.5 Create Private GitHub Repository

**Option A: Using GitHub CLI (Recommended)**

```bash
# Create private repository and push
gh repo create portfolio --private --source=. --remote=origin

# Set branch to main
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Option B: Using GitHub Website**

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `portfolio` (or your choice)
3. **Description**: "My Portfolio Website"
4. **Visibility**: Select **Private** ✅
5. **DO NOT** check "Initialize with README"
6. Click **Create repository**

Then connect your local repository:

```bash
# Add remote repository (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote
git remote -v

# Set branch to main
git branch -M main

# Push code to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Use a Personal Access Token (PAT) instead of password
- Create PAT: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate token with `repo` scope
- Use token as password when pushing

#### 4.6 Verify Push

```bash
# Check remote status
git remote -v

# Verify branch is tracking remote
git branch -vv

# Check if everything is pushed
git status
```

You should see: `Your branch is up to date with 'origin/main'`

---

### Step 5: Build for Production

#### 5.1 Update Vite Config for GitHub Pages

Edit `vite.config.ts`:

```typescript
export default defineConfig({
  // IMPORTANT: Uncomment and update with your repository name
  base: '/portfolio/', // Replace 'portfolio' with your actual repo name
  plugins: [react()],
  // ... rest of config
});
```

**Important Notes:**
- If your repo is `github.com/username/portfolio`, use `base: '/portfolio/'`
- If your repo is `github.com/username/username.github.io`, use `base: '/'`
- This ensures all assets load correctly on GitHub Pages

#### 5.2 Build the Project

```bash
# Build for production
npm run build
```

**Expected Output:**
```
vite v5.4.2 building for production...
✓ 150 modules transformed.
dist/index.html                   0.50 kB
dist/assets/index-abc123.js       245.67 kB
dist/assets/index-def456.css      12.34 kB
✓ built in 2.5s
```

**Build Output:**
- All files are in the `dist/` folder
- Files are minified and optimized
- Assets are hashed for cache busting

#### 5.3 Verify Build

```bash
# Check dist folder
ls -la dist/

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to see the production build.

---

### Step 6: Deploy to GitHub Pages

#### 6.1 Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
4. Click **Save**

#### 6.2 Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select:
   - **GitHub Actions** (for automatic deployment)
3. The page will show: "Your site is ready to be published"

#### 6.3 Trigger Deployment

**Option A: Automatic (Recommended)**

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy when you push to `main`:

```bash
# Make any change (or just push again)
git add .
git commit -m "Trigger deployment"
git push origin main
```

**Option B: Manual Deployment**

```bash
# Install gh-pages (if not already installed)
npm install --save-dev gh-pages

# Deploy manually
npm run deploy
```

Then in GitHub:
1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **gh-pages** branch and **/ (root)** folder
4. Click **Save**

#### 6.4 Monitor Deployment

1. Go to your repository → **Actions** tab
2. You'll see the deployment workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, your site is live!

#### 6.5 Access Your Live Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:**
- Username: `jagathcharan`
- Repo: `portfolio`
- URL: `https://jagathcharan.github.io/portfolio/`

#### 6.6 Verify Deployment

1. Visit your GitHub Pages URL
2. Check that all assets load correctly
3. Test navigation and all sections
4. Verify responsive design on mobile

---

### Step 7: Custom Domain Setup

#### 7.1 Purchase Domain (If Needed)

- Popular providers: Namecheap, GoDaddy, Google Domains
- Choose a domain name (e.g., `jagathcharan.com`)

#### 7.2 Create CNAME File

Create a file `public/CNAME`:

```bash
# Create CNAME file
echo "yourdomain.com" > public/CNAME

# Or create it manually with content:
# yourdomain.com
```

**Important:** Replace `yourdomain.com` with your actual domain.

#### 7.3 Commit and Push CNAME

```bash
git add public/CNAME
git commit -m "Add custom domain CNAME"
git push origin main
```

#### 7.4 Configure DNS Records

Go to your domain provider's DNS settings and add:

**For Root Domain (yourdomain.com):**
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

**For Subdomain (www.yourdomain.com):**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**Note:** Replace `YOUR_USERNAME` with your GitHub username.

#### 7.5 Configure Domain in GitHub

1. Go to your repository → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain: `yourdomain.com`
3. Check **Enforce HTTPS** (recommended)
4. Click **Save**

#### 7.7 Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- Check status: [whatsmydns.net](https://www.whatsmydns.net/)
- Once propagated, your site will be accessible at your custom domain

#### 7.8 Verify SSL Certificate

GitHub automatically provisions SSL certificates for custom domains. Wait a few minutes after adding the domain, then:
- Visit `https://yourdomain.com`
- Check that the padlock icon appears in the browser

---

## Environment Variables

### Optional: Configure EmailJS (Contact Form)

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service and template
3. Create `.env` file in project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Optional: Configure AI Services

```env
# OpenAI API Key
VITE_OPENAI_API_KEY=your_openai_key

# Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_key

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**For GitHub Pages Deployment:**
- Add environment variables as GitHub Secrets:
  1. Go to repository → **Settings** → **Secrets and variables** → **Actions**
  2. Click **New repository secret**
  3. Add each variable
  4. Update `.github/workflows/deploy.yml` to use secrets

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── resume.pdf              # Resume file (replace with yours)
│   └── CNAME                   # Custom domain file (if using)
├── src/
│   ├── components/             # React components
│   │   ├── About.tsx
│   │   ├── AIChat.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── FloatingResumeButton.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LoggerPanel.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── utils/                  # Utility functions
│   │   ├── aiService.ts
│   │   ├── emailService.ts
│   │   ├── fuzzyMatch.ts
│   │   ├── geminiService.ts
│   │   ├── localAI.ts
│   │   ├── logger.ts
│   │   └── openaiService.ts
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start development server (http://localhost:5173)
npm run build            # Build for production (creates dist/ folder)
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint to check code quality
npm run typecheck        # Check TypeScript types without building

# Deployment
npm run deploy           # Build and deploy to GitHub Pages (uses gh-pages)
```

---

## Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/Hero.tsx`
   - Update name, title, description

2. **About Section**: Edit `src/components/About.tsx`
   - Update bio, domains of expertise

3. **Skills**: Edit `src/components/Skills.tsx`
   - Update skills list and proficiency levels

4. **Projects**: Edit `src/components/Projects.tsx`
   - Update project details, descriptions, tech stack

5. **Experience**: Edit `src/components/Experience.tsx`
   - Update work experience, roles, companies

6. **Certifications**: Edit `src/components/Certifications.tsx`
   - Update certifications and achievements

7. **Contact**: Edit `src/components/Contact.tsx` and `src/components/Footer.tsx`
   - Update email, social media links, contact information

### Update Resume

Replace `public/resume.pdf` with your resume file (keep the same filename or update the reference in `FloatingResumeButton.tsx`).

### Change Colors/Theme

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'ai-primary': '#2563eb',    // Primary blue
      'ai-secondary': '#7c3aed',  // Purple
      'ai-accent': '#06b6d4',     // Cyan
      'ai-success': '#10b981',   // Green
    },
  },
}
```

---

## Troubleshooting

### Node Modules Installation Issues

**Problem:** `npm install` fails or takes too long

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use different registry (if needed)
npm install --registry https://registry.npmjs.org/
```

### Development Server Issues

**Problem:** Port 5173 already in use

**Solution:** Change port in `vite.config.ts`:
```typescript
server: {
  port: 3000, // Use different port
}
```

**Problem:** Site not loading or showing errors

**Solutions:**
- Check browser console for errors
- Verify Node.js version: `node --version` (should be v18+)
- Clear browser cache
- Restart development server

### Git Push Issues

**Problem:** Authentication failed

**Solutions:**
```bash
# Use Personal Access Token instead of password
# Create token: GitHub → Settings → Developer settings → Personal access tokens

# Or use SSH instead of HTTPS
git remote set-url origin git@github.com:USERNAME/REPO.git
```

**Problem:** Remote repository not found

**Solution:**
```bash
# Verify remote URL
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/USERNAME/REPO.git
```

### Build Issues

**Problem:** Build fails with TypeScript errors

**Solutions:**
```bash
# Check TypeScript errors
npm run typecheck

# Fix errors in the reported files
# Or temporarily ignore in tsconfig.json
```

**Problem:** Build succeeds but site shows blank page

**Solutions:**
- Check `base` path in `vite.config.ts` matches repository name
- Verify all assets are loading (check browser console)
- Ensure `dist/` folder contains `index.html`

### GitHub Pages Issues

**Problem:** 404 Error on GitHub Pages

**Solutions:**
1. Verify `base` path in `vite.config.ts`:
   ```typescript
   base: '/your-repo-name/', // Must match repository name
   ```
2. Rebuild and redeploy:
   ```bash
   npm run build
   git add dist/
   git commit -m "Fix base path"
   git push origin main
   ```

**Problem:** Styles not loading

**Solutions:**
- Check browser console for 404 errors on CSS files
- Verify `base` path is correct
- Clear browser cache
- Check GitHub Actions logs for build errors

**Problem:** GitHub Actions deployment fails

**Solutions:**
1. Check Actions tab for error messages
2. Verify workflow permissions are set correctly
3. Check Node.js version in workflow (should be 18+)
4. Verify all dependencies are in `package.json`

### Domain Issues

**Problem:** Custom domain not working

**Solutions:**
1. Verify DNS records are correct (use [whatsmydns.net](https://www.whatsmydns.net/))
2. Check CNAME file exists in `public/CNAME`
3. Wait 24-48 hours for DNS propagation
4. Verify domain is added in GitHub Pages settings
5. Check SSL certificate status in GitHub Pages settings

**Problem:** HTTPS not working

**Solutions:**
- Wait for GitHub to provision SSL certificate (can take up to 24 hours)
- Ensure "Enforce HTTPS" is enabled in GitHub Pages settings
- Clear browser cache and try again

---

## Quick Reference Commands

```bash
# Complete setup from scratch
npm install                    # Install dependencies
npm run dev                   # Start development
npm run build                 # Build for production
git add .                     # Stage files
git commit -m "Message"       # Commit changes
git push origin main          # Push to GitHub

# After initial setup
npm run dev                   # Development
npm run build && npm run preview  # Test production build
git add . && git commit -m "Update" && git push  # Deploy updates
```

---

## 📄 License

This project is private and proprietary. All rights reserved.

## 👤 Author

**Vankayala Jagath Charan**
- Portfolio: [Your GitHub Pages URL]
- LinkedIn: [Your LinkedIn Profile]
- Email: [Your Email]

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

## 🎉 Success Checklist

After completing all steps, verify:

- [ ] Node.js and npm are installed
- [ ] Dependencies installed (`node_modules/` exists)
- [ ] Development server runs (`npm run dev`)
- [ ] Site loads locally at `http://localhost:5173`
- [ ] Git repository initialized and configured
- [ ] Code pushed to GitHub (private repository)
- [ ] `vite.config.ts` has correct `base` path
- [ ] Production build succeeds (`npm run build`)
- [ ] GitHub Actions enabled and workflow runs
- [ ] GitHub Pages enabled and site is live
- [ ] Site accessible at `https://username.github.io/repo-name/`
- [ ] Custom domain configured (if applicable)
- [ ] All sections load correctly
- [ ] Mobile responsive design works
- [ ] Contact form works (if configured)

**Congratulations! Your portfolio is now live! 🚀**
