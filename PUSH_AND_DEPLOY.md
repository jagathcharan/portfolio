# 🚀 Push and Deploy Guide for Portfolio

**Repository:** https://github.com/jagathcharan/portfolio  
**Site URL:** https://jagathcharan.github.io/portfolio/  
**Status:** Private Repository, Public Site

---

## Quick Deploy (Automated)

Run the deployment script:

```bash
chmod +x DEPLOY_NOW.sh
./DEPLOY_NOW.sh
```

This script will:
1. ✅ Check git setup
2. ✅ Install dependencies (if needed)
3. ✅ Build the project
4. ✅ Commit changes
5. ✅ Push to GitHub
6. ✅ Provide next steps

---

## Manual Deploy (Step by Step)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Verify Configuration

Check that `vite.config.ts` has:
```typescript
base: '/portfolio/',
```

### Step 3: Build Project

```bash
npm run build
```

### Step 4: Setup Git Remote (If Not Done)

```bash
# Check current remote
git remote -v

# If not set, add remote
git remote add origin https://github.com/jagathcharan/portfolio.git

# Verify
git remote -v
```

### Step 5: Commit and Push

```bash
# Stage all files
git add .

# Commit changes
git commit -m "Deploy portfolio to GitHub Pages"

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**If authentication fails:**
- Use Personal Access Token instead of password
- Create token: GitHub → Settings → Developer settings → Personal access tokens
- Use token as password when pushing

### Step 6: Enable GitHub Pages

1. **Enable GitHub Actions:**
   - Go to: https://github.com/jagathcharan/portfolio/settings/actions
   - Under **Workflow permissions**, select: **Read and write permissions**
   - Click **Save**

2. **Enable GitHub Pages:**
   - Go to: https://github.com/jagathcharan/portfolio/settings/pages
   - Under **Source**, select: **GitHub Actions**
   - The page will show deployment status

3. **Monitor Deployment:**
   - Go to: https://github.com/jagathcharan/portfolio/actions
   - Watch the "Deploy to GitHub Pages" workflow run
   - Wait for it to complete (usually 1-2 minutes)

### Step 7: Access Your Site

Once deployment completes, your site will be live at:
```
https://jagathcharan.github.io/portfolio/
```

---

## Update and Redeploy

After making changes:

```bash
# Make your changes to files

# Build
npm run build

# Commit and push
git add .
git commit -m "Update portfolio content"
git push origin main
```

The GitHub Actions workflow will automatically redeploy your site!

---

## Troubleshooting

### Build Fails

```bash
# Check for errors
npm run typecheck

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Push Fails

```bash
# Check remote
git remote -v

# Update remote if needed
git remote set-url origin https://github.com/jagathcharan/portfolio.git

# Try pushing again
git push origin main
```

### GitHub Pages Shows 404

1. Verify `vite.config.ts` has: `base: '/portfolio/'`
2. Rebuild and push:
   ```bash
   npm run build
   git add .
   git commit -m "Fix base path"
   git push origin main
   ```
3. Wait for GitHub Actions to complete

### GitHub Actions Not Running

1. Check Actions are enabled:
   - Settings → Actions → General → Allow all actions
2. Check workflow permissions:
   - Settings → Actions → General → Workflow permissions → Read and write
3. Verify `.github/workflows/deploy.yml` exists

---

## Current Configuration

✅ **Repository:** https://github.com/jagathcharan/portfolio  
✅ **Base Path:** `/portfolio/` (configured in vite.config.ts)  
✅ **Branch:** `main`  
✅ **Deployment:** GitHub Actions (automatic)  
✅ **Site URL:** https://jagathcharan.github.io/portfolio/

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview build

# Git
git status               # Check status
git add .                # Stage files
git commit -m "Message"  # Commit
git push origin main     # Push to GitHub

# Full deploy
npm run build && git add . && git commit -m "Deploy" && git push origin main
```

---

**Your portfolio is configured and ready to deploy! 🎉**
