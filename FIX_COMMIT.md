# Quick Fix: Create Initial Commit

You need to create an initial commit before pushing to GitHub. Run these commands:

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Now run the setup script again
./setup-github-repo.sh
```

Or, if you prefer to do it manually:

```bash
# Add and commit
git add .
git commit -m "Initial commit: Portfolio website"

# Create the repository (replace 'portfolio' with your repo name)
gh repo create portfolio --private --source=. --remote=origin --push
```
