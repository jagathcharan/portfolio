#!/bin/bash

# Quick GitHub Repository Setup - Fixed Version
echo "🚀 Quick GitHub Repository Setup"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Check if there are uncommitted changes or no commits
if ! git rev-parse --verify HEAD >/dev/null 2>&1 || [ -n "$(git status --porcelain)" ]; then
    echo "📝 Staging and committing files..."
    git add .
    
    # Check if there's anything to commit
    if [ -n "$(git status --porcelain)" ]; then
        git commit -m "Initial commit: Portfolio website"
        echo "✅ Commit created successfully"
    else
        echo "⚠️  No changes to commit (all files may be ignored)"
    fi
fi

# Verify we have at least one commit
if git rev-parse --verify HEAD >/dev/null 2>&1; then
    echo "✅ Repository has commits"
    echo ""
    
    # Get repository details
    read -p "Enter your repository name (e.g., portfolio): " repo_name
    read -p "Enter your GitHub username: " github_username
    
    echo ""
    echo "📝 Creating private repository: $repo_name"
    
    # Create repository without --push first
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
            echo "❌ Failed to push code"
        fi
    else
        echo "❌ Failed to create repository"
    fi
else
    echo "❌ No commits found. Please check your .gitignore file."
    echo "   Some files might be ignored. Run 'git status' to see what's happening."
fi
