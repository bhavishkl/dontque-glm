#!/bin/bash

# Script to push changes to GitHub remote main branch
# This script requires a GitHub Personal Access Token for authentication

echo "🚀 Pushing changes to GitHub remote main branch..."
echo "================================================"

# Check if token is provided
if [ -z "$1" ]; then
    echo "❌ Usage: $0 <github_personal_access_token>"
    echo "   Or set GITHUB_TOKEN environment variable first"
    exit 1
fi

GITHUB_TOKEN="$1"

# Set up remote URL with authentication
REMOTE_URL="https://${GITHUB_TOKEN}@github.com/bhavishkl/dontque-glm.git"

# Configure remote origin
echo "📡 Configuring remote origin..."
git remote set-url origin "${REMOTE_URL}"

# Push to main branch
echo "⬆️  Pushing to main branch..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Changes pushed to GitHub remote main branch"
    echo "===================================================="
    echo "📋 Summary of what was pushed:"
    git log --oneline -2
    echo ""
    echo "🌐 Repository: https://github.com/bhavishkl/dontque-glm.git"
    echo "📝 Branch: main"
else
    echo ""
    echo "❌ FAILED! Could not push to GitHub"
    echo "=================================="
    echo "🔍 Please check your:"
    echo "   • GitHub Personal Access Token is valid"
    echo "   • Repository URL is correct"
    echo "   • Network connection"
    exit 1
fi