#!/bin/bash

# Simple Git Commit Script - Main Branch Only
# This script stages, commits, and pushes changes to main branch in one go

echo "🔍 Checking git status..."
git status

if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to commit. Working tree is clean."
    exit 0
fi

echo ""
echo "📝 Changes detected:"
git status --short

echo ""
read -p "Enter commit message: " commit_message

if [ -z "$commit_message" ]; then
    echo "❌ Commit message cannot be empty. Aborting."
    exit 1
fi

echo ""
echo "⏳ Staging changes..."
git add .

echo ""
echo "💾 Committing changes..."
git commit -m "$commit_message"

echo ""
echo "🚀 Pushing to main branch..."
git push origin main

echo ""
echo "✅ Done! Changes have been committed and pushed successfully."
echo "📋 Commit details:"
git log --oneline -1