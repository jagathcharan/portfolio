# 🚀 Quick Reference Guide

## Complete Setup in 10 Steps

### 1. Install Prerequisites
```bash
# Node.js (v18+)
node --version

# Git
git --version

# GitHub CLI (optional)
gh --version
```

### 2. Install Node Modules
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
# Visit: http://localhost:5173
```

### 4. Initialize Git
```bash
git init
git add .
git commit -m "Initial commit"
```

### 5. Create GitHub Repository
```bash
# Using GitHub CLI
gh repo create portfolio --private --source=. --remote=origin
git branch -M main
git push -u origin main
```

### 6. Update Vite Config
Edit `vite.config.ts`:
```typescript
base: '/portfolio/', // Your repo name
```

### 7. Build for Production
```bash
npm run build
```

### 8. Enable GitHub Pages
- Settings → Pages → Source: **GitHub Actions**
- Settings → Actions → General → Workflow permissions: **Read and write**

### 9. Deploy
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 10. Access Your Site
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Git
git status               # Check status
git add .                # Stage all files
git commit -m "Message"  # Commit changes
git push origin main     # Push to GitHub

# Troubleshooting
npm cache clean --force  # Clear npm cache
rm -rf node_modules      # Remove node_modules
npm install              # Reinstall
```

---

## Important Files to Update

1. **vite.config.ts** - Set `base: '/your-repo-name/'`
2. **src/components/Hero.tsx** - Your name and title
3. **src/components/About.tsx** - Your bio
4. **src/components/Projects.tsx** - Your projects
5. **src/components/Experience.tsx** - Your work experience
6. **public/resume.pdf** - Your resume

---

## Domain Setup (Quick)

1. Create `public/CNAME` with your domain
2. Add DNS records (A and CNAME)
3. Add domain in GitHub Pages settings
4. Wait 24-48 hours for propagation

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Port in use | Change port in `vite.config.ts` |
| Build fails | Check `base` path, run `npm run typecheck` |
| 404 on GitHub Pages | Verify `base` path matches repo name |
| Styles not loading | Check `base` path, clear browser cache |
| Git auth fails | Use Personal Access Token |

---

**For detailed instructions, see [README.md](README.md)**
