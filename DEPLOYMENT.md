# Deployment Guide - Quick Reference

This is a quick reference guide for deploying your portfolio to GitHub Pages.

## 🚀 Quick Start Deployment

### Prerequisites Checklist
- [ ] Node.js v18+ installed
- [ ] Git installed
- [ ] GitHub account created
- [ ] Repository created on GitHub (can be private)

### Step-by-Step Deployment

#### 1. Install Dependencies Locally

```bash
npm install
```

This will install all dependencies including `gh-pages` for deployment.

#### 2. Update Repository Name in Config

**Important**: If your repository name is NOT the root domain, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/', // Replace with your actual repo name
  // ... rest of config
});
```

**Example**: If your repo is `https://github.com/jagath/portfolio`, set:
```typescript
base: '/portfolio/',
```

If your repo is `https://github.com/jagath/jagath.github.io`, you can leave base as `/` or uncomment and set to `/`.

#### 3. Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

#### 4. Connect to GitHub Repository

```bash
# Replace with your actual repository URL
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

#### 5. Choose Deployment Method

### Method A: Automatic Deployment (Recommended)

1. **Enable GitHub Actions**:
   - Go to your repo → **Settings** → **Actions** → **General**
   - Under **Workflow permissions**, select **Read and write permissions**
   - Click **Save**

2. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Push to trigger deployment**:
   ```bash
   git push origin main
   ```

4. **Monitor deployment**:
   - Go to **Actions** tab in your repository
   - Watch the workflow run and deploy

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

### Method B: Manual Deployment

1. **Build and deploy**:
   ```bash
   npm run deploy
   ```

2. **Configure GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select **gh-pages** branch and **/ (root)** folder
   - Click **Save**

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## 🔐 Private Repository Setup

### Making Your Repo Private with Public Site

1. **Create/Convert Repository to Private**:
   - Go to repository → **Settings** → **General** → **Danger Zone**
   - Change repository visibility to **Private**

2. **GitHub Pages Still Works**:
   - GitHub Pages sites are **publicly accessible** even if the repository is private
   - Your code stays private, but the website is public

3. **Deploy as usual**:
   - Follow the deployment steps above
   - Your site will be public, but your code remains private

## 🔄 Updating Your Site

### After Making Changes

1. **Make your changes** to the code

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```

3. **Automatic deployment** (if using GitHub Actions):
   - The site will automatically rebuild and deploy
   - Check the **Actions** tab for status

4. **Manual deployment** (if using gh-pages):
   ```bash
   npm run deploy
   ```

## 🐛 Troubleshooting

### Site Shows 404

- **Check base path**: Ensure `base` in `vite.config.ts` matches your repo name
- **Wait a few minutes**: GitHub Pages can take 1-5 minutes to update
- **Clear browser cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Build Fails

- **Check Actions tab**: View the error logs
- **Verify Node version**: Should be v18+
- **Check dependencies**: Run `npm install` again

### Styles Not Loading

- **Verify base path**: All assets need correct base path
- **Check browser console**: Look for 404 errors on assets
- **Rebuild**: Try `npm run build` locally to test

### Environment Variables

If you need environment variables:

1. **Go to repository** → **Settings** → **Secrets and variables** → **Actions**
2. **Add secrets** for each variable (e.g., `VITE_EMAILJS_SERVICE_ID`)
3. **Update `.github/workflows/deploy.yml`** to use the secrets:
   ```yaml
   env:
     VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
   ```

## 📝 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
npm run deploy           # Build and deploy to GitHub Pages

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Check TypeScript types
```

## ✅ Post-Deployment Checklist

- [ ] Site is accessible at GitHub Pages URL
- [ ] All images and assets load correctly
- [ ] Navigation works properly
- [ ] Contact form works (if configured)
- [ ] Mobile responsive design works
- [ ] All links are correct
- [ ] Resume download works

## 🎉 Success!

Your portfolio is now live! Share your GitHub Pages URL with the world.

**Remember**: 
- Keep your repository private if you want to protect your code
- The website will still be publicly accessible
- Update content by pushing to the main branch
