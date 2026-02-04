# Manual Fix - Run These Commands Now

Since the script had an issue, here are the exact commands to run:

```bash
# 1. Make sure you have a commit
git add .
git commit -m "Initial commit: Portfolio website"

# 2. Verify the commit exists
git log --oneline -1

# 3. Create the repository WITHOUT --push flag
gh repo create portfolio --private --source=. --remote=origin

# 4. Set branch to main and push
git branch -M main
git push -u origin main
```

That's it! Your repository will be created and code will be pushed.
