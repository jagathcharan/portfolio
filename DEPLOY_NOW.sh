#!/bin/bash

# Complete Deployment Script for https://github.com/jagathcharan/portfolio
# This script will push and deploy your portfolio to GitHub Pages

echo "🚀 Portfolio Deployment Script"
echo "================================"
echo ""
echo "Repository: https://github.com/jagathcharan/portfolio"
echo "Site URL: https://jagathcharan.github.io/portfolio/"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📦 Initializing Git repository...${NC}"
    git init
fi

# Step 2: Check if remote is set
if ! git remote get-url origin &>/dev/null; then
    echo -e "${YELLOW}🔗 Adding remote repository...${NC}"
    git remote add origin https://github.com/jagathcharan/portfolio.git
else
    echo -e "${GREEN}✅ Remote repository already configured${NC}"
    CURRENT_REMOTE=$(git remote get-url origin)
    echo "   Current remote: $CURRENT_REMOTE"
fi

# Step 3: Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi

# Step 4: Verify vite.config.ts has correct base path
if grep -q "base: '/portfolio/'" vite.config.ts; then
    echo -e "${GREEN}✅ Vite config has correct base path${NC}"
else
    echo -e "${RED}❌ ERROR: vite.config.ts base path is not set to '/portfolio/'${NC}"
    echo "   Please update vite.config.ts with: base: '/portfolio/'"
    exit 1
fi

# Step 5: Build the project
echo ""
echo -e "${YELLOW}🔨 Building project for production...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Please fix errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Step 6: Stage all files
echo ""
echo -e "${YELLOW}📝 Staging files...${NC}"
git add .

# Step 7: Configure git user if not set
if [ -z "$(git config user.name)" ] || [ -z "$(git config user.email)" ]; then
    echo -e "${YELLOW}⚙️  Configuring Git user...${NC}"
    git config user.name "Jagath Charan"
    git config user.email "jagathcharan2004@gmail.com"
    echo -e "${GREEN}✅ Git user configured${NC}"
fi

# Step 8: Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    # Step 9: Commit changes
    echo -e "${YELLOW}💾 Committing changes...${NC}"
    if ! git commit -m "Deploy portfolio to GitHub Pages - $(date +'%Y-%m-%d %H:%M:%S')" 2>&1; then
        echo -e "${RED}❌ Commit failed!${NC}"
        echo ""
        echo "Configuring Git user automatically..."
        git config user.name "Jagath Charan" || true
        git config user.email "jagathcharan2004@gmail.com" || true
        echo -e "${GREEN}✅ Git user configured, retrying commit...${NC}"
        git commit -m "Deploy portfolio to GitHub Pages - $(date +'%Y-%m-%d %H:%M:%S')" || {
            echo -e "${RED}❌ Commit still failed!${NC}"
            echo "Please configure git user manually:"
            echo "  git config user.name 'Your Name'"
            echo "  git config user.email 'your.email@example.com'"
            exit 1
        }
    fi
    echo -e "${GREEN}✅ Changes committed${NC}"
fi

# Step 9: Check if we have any commits
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo -e "${RED}❌ No commits found! Cannot push.${NC}"
    echo "Please commit your changes first."
    exit 1
fi

# Step 10: Set branch to main (create if doesn't exist)
git branch -M main 2>/dev/null || git checkout -b main

# Step 11: Pull remote changes if they exist
echo ""
echo -e "${YELLOW}🔄 Checking for remote changes...${NC}"
if git ls-remote --heads origin main | grep -q main; then
    echo -e "${YELLOW}📥 Remote branch exists, pulling changes...${NC}"
    git pull origin main --allow-unrelated-histories --no-edit || {
        echo -e "${YELLOW}⚠️  Merge conflict or pull failed. Attempting to merge...${NC}"
        git pull origin main --no-rebase --allow-unrelated-histories || {
            echo -e "${YELLOW}⚠️  Using merge strategy...${NC}"
            git pull origin main --strategy-option=theirs --allow-unrelated-histories || true
        }
    }
    echo -e "${GREEN}✅ Remote changes integrated${NC}"
else
    echo -e "${GREEN}✅ No remote branch, will create new one${NC}"
fi

# Step 12: Push to GitHub
echo ""
echo -e "${YELLOW}📤 Pushing to GitHub...${NC}"
git push -u origin main

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Push failed!${NC}"
    echo ""
    echo "Possible solutions:"
    echo "1. Pull and merge manually: git pull origin main --allow-unrelated-histories"
    echo "2. Force push (use with caution): git push -u origin main --force"
    echo "3. Check your GitHub authentication"
    echo "4. Use Personal Access Token if password doesn't work"
    exit 1
fi

echo -e "${GREEN}✅ Code pushed successfully!${NC}"

# Step 11: Instructions for GitHub Pages
echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps to enable GitHub Pages:"
echo ""
echo "1. Go to: https://github.com/jagathcharan/portfolio/settings/pages"
echo "2. Under 'Source', select: GitHub Actions"
echo "3. Go to: https://github.com/jagathcharan/portfolio/settings/actions"
echo "4. Under 'Workflow permissions', select: Read and write permissions"
echo "5. Click 'Save'"
echo ""
echo "The GitHub Actions workflow will automatically deploy your site."
echo "Check the Actions tab to monitor deployment progress."
echo ""
echo "Your site will be live at:"
echo -e "${GREEN}https://jagathcharan.github.io/portfolio/${NC}"
echo ""
echo "Note: It may take 1-2 minutes for the deployment to complete."
