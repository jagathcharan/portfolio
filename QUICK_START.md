# 🚀 Quick Start Guide

Get your portfolio website up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Update Repository Name

Edit `vite.config.ts` and uncomment/update the base path:

```typescript
base: '/your-repo-name/', // Replace with your actual GitHub repo name
```

**Example**: If your repo is `github.com/jagath/portfolio`, use:
```typescript
base: '/portfolio/',
```

## Step 3: Initialize Git & Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Go to **Settings** → **Actions** → **General**
5. Under **Workflow permissions**, select **Read and write permissions**
6. Click **Save**

## Step 5: Deploy

The GitHub Actions workflow will automatically deploy when you push. Or deploy manually:

```bash
npm run deploy
```

## Step 6: Access Your Site

Your site will be live at:
```
https://yourusername.github.io/your-repo-name/
```

## 🎉 Done!

Your portfolio is now live! For detailed instructions, see [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md).

---

**Note**: You can keep your repository **private** - the website will still be publicly accessible!
