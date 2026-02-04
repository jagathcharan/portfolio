# 🔐 GitHub Repository Setup Guide

This guide will help you create a private GitHub repository and push your portfolio code.

## Method 1: Using GitHub CLI (Recommended - Fastest)

### Step 1: Install GitHub CLI

**On Ubuntu/WSL:**
```bash
sudo apt update
sudo apt install gh
```

**On Windows:**
Download from: https://cli.github.com/

### Step 2: Authenticate with GitHub

```bash
gh auth login
```

Follow the prompts:
- Choose **GitHub.com**
- Choose **HTTPS** or **SSH** (HTTPS is easier)
- Authenticate via **web browser** (recommended) or token
- Follow the browser authentication flow

### Step 3: Create Private Repository

```bash
# Make the script executable
chmod +x setup-github-repo.sh

# Run the setup script
./setup-github-repo.sh
```

**Or manually:**
```bash
# Replace 'portfolio' with your desired repo name
gh repo create portfolio --private --source=. --remote=origin --push
```

### Step 4: Update Vite Config

Edit `vite.config.ts` and uncomment/update the base path:

```typescript
export default defineConfig({
  base: '/portfolio/', // Replace 'portfolio' with your repo name
  // ... rest of config
});
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Go to **Settings** → **Actions** → **General**
5. Under **Workflow permissions**, select **Read and write permissions**
6. Click **Save**

Your site will be live at: `https://yourusername.github.io/portfolio/`

---

## Method 2: Manual Setup via GitHub Website

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name**: Enter your desired name (e.g., `portfolio`)
3. **Description**: (Optional) "My Portfolio Website"
4. **Visibility**: Select **Private** ✅
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 2: Connect Your Local Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Add remote repository (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Update Vite Config

Edit `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/', // Replace with your actual repo name
  // ... rest of config
});
```

### Step 4: Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Go to **Settings** → **Actions** → **General**
4. Under **Workflow permissions**, select **Read and write permissions**
5. Click **Save**

---

## Method 3: Quick Setup Script

Run the provided script:

```bash
chmod +x setup-github-repo.sh
./setup-github-repo.sh
```

The script will guide you through the process.

---

## 🔑 Important Notes

### Private Repository = Public Website

- ✅ Your **code** stays **private** (only you can see it)
- ✅ Your **website** is **publicly accessible** (anyone can visit it)
- This is perfect for portfolio sites!

### Authentication Options

**HTTPS (Recommended for beginners):**
- Uses your GitHub username and password/token
- Easier to set up

**SSH (More secure):**
- Requires SSH key setup
- More secure for frequent use

### Repository Name Best Practices

- Use lowercase letters and hyphens
- Examples: `portfolio`, `my-portfolio`, `jagath-portfolio`
- Avoid spaces and special characters

---

## 🚀 After Setup

Once your repository is created and code is pushed:

1. **Verify deployment**: Check the **Actions** tab in your GitHub repository
2. **Access your site**: `https://yourusername.github.io/repo-name/`
3. **Update content**: Just push changes to `main` branch - site auto-updates!

---

## 🐛 Troubleshooting

### "Repository already exists"
- The repository name is taken
- Choose a different name

### "Authentication failed"
- Run `gh auth login` again
- Or use a Personal Access Token

### "Permission denied"
- Check your GitHub authentication
- Verify you have permission to create repositories

### "Remote origin already exists"
- Remove existing remote: `git remote remove origin`
- Then add your new remote

---

## 📝 Quick Reference Commands

```bash
# Check if GitHub CLI is installed
gh --version

# Authenticate
gh auth login

# Create private repo and push
gh repo create portfolio --private --source=. --remote=origin --push

# Check git status
git status

# View remotes
git remote -v

# Push changes
git add .
git commit -m "Update portfolio"
git push origin main
```

---

**Need help?** Check the main [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md) for more details.
