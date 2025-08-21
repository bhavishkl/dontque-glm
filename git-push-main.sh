#!/bin/bash

echo "🚀 Ready to push changes to GitHub remote main branch"
echo "=================================================="

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Not on main branch. Current branch: $CURRENT_BRANCH"
    echo "Please run: git checkout main"
    exit 1
fi

# Check if remote is configured
if ! git remote get-url origin &>/dev/null; then
    echo "📡 Setting up remote origin..."
    git remote add origin https://github.com/bhavishkl/dontque-glm.git
fi

# Show what will be pushed
echo ""
echo "📋 Commits to be pushed:"
git log --oneline -2
echo ""

echo "🌐 Remote URL: $(git remote get-url origin)"
echo "📝 Branch: main"
echo ""

# Try to push
echo "⬆️  Attempting to push to remote main branch..."
if git push -u origin main 2>&1; then
    echo ""
    echo "✅ SUCCESS! Changes pushed to GitHub remote main branch"
    echo "===================================================="
else
    echo ""
    echo "❌ Authentication failed. Please use one of these methods:"
    echo ""
    echo "Method 1 - Personal Access Token:"
    echo "  git push https://YOUR_TOKEN@github.com/bhavishkl/dontque-glm.git main"
    echo ""
    echo "Method 2 - GitHub CLI:"
    echo "  gh auth login"
    echo "  git push -u origin main"
    echo ""
    echo "Method 3 - SSH:"
    echo "  git remote set-url origin git@github.com:bhavishkl/dontque-glm.git"
    echo "  git push -u origin main"
    echo ""
    echo "See PUSH_INSTRUCTIONS.md for detailed setup instructions."
fi