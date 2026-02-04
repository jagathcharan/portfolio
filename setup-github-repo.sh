#!/bin/bash

# GitHub Repository Setup Script
# This script helps you create a private GitHub repository and push your code

echo "🚀 GitHub Repository Setup Script"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI (gh) is installed"
    echo ""
    echo "🔐 Please authenticate with GitHub:"
    echo "   Run: gh auth login"
    echo ""
    read -p "Have you authenticated with GitHub CLI? (y/n): " auth_confirm
    
    if [ "$auth_confirm" = "y" ] || [ "$auth_confirm" = "Y" ]; then
        # Check if there are any commits or uncommitted changes
        if ! git rev-parse --verify HEAD >/dev/null 2>&1 || [ -n "$(git status --porcelain)" ]; then
            echo ""
            echo "📝 Staging and committing files..."
            git add .
            if [ -n "$(git status --porcelain)" ]; then
                git commit -m "Initial commit: Portfolio website"
                echo "✅ Commit created successfully"
            fi
        fi
        
        # Verify we have commits
        if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
            echo "❌ Error: No commits found. Please check your .gitignore file."
            exit 1
        fi
        
        echo "✅ Repository has commits"
        
        # Get repository name
        read -p "Enter your repository name (e.g., portfolio): " repo_name
        read -p "Enter your GitHub username: " github_username
        
        # Create private repository (without --push to avoid timing issues)
        echo ""
        echo "📝 Creating private repository: $repo_name"
        gh repo create "$repo_name" --private --source=. --remote=origin
        
        if [ $? -eq 0 ]; then
            echo "✅ Repository created successfully!"
            echo ""
            echo "📤 Pushing code to repository..."
            git branch -M main
            git push -u origin main
            
            if [ $? -eq 0 ]; then
                echo "✅ Code pushed successfully!"
                echo ""
                echo "🎉 Setup complete!"
                echo ""
                echo "🔧 Next steps:"
                echo "1. Update vite.config.ts with base path: '/$repo_name/'"
                echo "2. Go to: https://github.com/$github_username/$repo_name/settings/pages"
                echo "3. Under 'Source', select 'GitHub Actions'"
                echo "4. Go to Settings → Actions → General → Workflow permissions: 'Read and write'"
                echo "5. Your site will be at: https://$github_username.github.io/$repo_name/"
            else
                echo "❌ Failed to push code. Try manually: git push -u origin main"
            fi
        else
            echo "❌ Failed to create repository"
        fi
    else
        echo "Please authenticate first by running: gh auth login"
    fi
else
    echo "⚠️  GitHub CLI (gh) is not installed"
    echo ""
    echo "📥 Install GitHub CLI:"
    echo "   Ubuntu/Debian: sudo apt install gh"
    echo "   Or visit: https://cli.github.com/"
    echo ""
    echo "🔧 Alternative: Create repository manually on GitHub.com"
    echo "   1. Go to https://github.com/new"
    echo "   2. Create a private repository"
    echo "   3. Then run these commands:"
    echo ""
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git branch -M main"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    echo "   git push -u origin main"
fi
