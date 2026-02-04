# ✅ Run These Commands Now

## Complete Setup and Deploy for Your Portfolio

**Your Repository:** https://github.com/jagathcharan/portfolio  
**Your Site URL:** https://jagathcharan.github.io/portfolio/

---

## Option 1: Automated (Easiest)

```bash
# Make script executable
chmod +x DEPLOY_NOW.sh

# Run deployment script
./DEPLOY_NOW.sh
```

The script will do everything automatically!

---

## Option 2: Manual Commands

Copy and paste these commands one by one:

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Setup git remote (if not already done)
git remote add origin https://github.com/jagathcharan/portfolio.git

# 4. Stage all files
git add .

# 5. Commit changes
git commit -m "Deploy portfolio to GitHub Pages"

# 6. Set branch to main
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

---

## After Pushing: Enable GitHub Pages

1. **Enable GitHub Actions:**
   - Visit: https://github.com/jagathcharan/portfolio/settings/actions
   - Under "Workflow permissions", select: **Read and write permissions**
   - Click **Save**

2. **Enable GitHub Pages:**
   - Visit: https://github.com/jagathcharan/portfolio/settings/pages
   - Under "Source", select: **GitHub Actions**
   - Click **Save**

3. **Check Deployment:**
   - Visit: https://github.com/jagathcharan/portfolio/actions
   - Wait for "Deploy to GitHub Pages" workflow to complete (1-2 minutes)

4. **Access Your Site:**
   - Visit: https://jagathcharan.github.io/portfolio/

---

## ✅ Configuration Already Done

- ✅ `vite.config.ts` - Base path set to `/portfolio/`
- ✅ `.github/workflows/deploy.yml` - Deployment workflow ready
- ✅ `package.json` - All dependencies and scripts configured
- ✅ `.gitignore` - Properly configured

---

## 🎉 That's It!

Your portfolio will be live at: **https://jagathcharan.github.io/portfolio/**

**Note:** Your repository is private, but the website will be publicly accessible!
