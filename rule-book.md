# Rule Book - Important Lessons to Remember

## Lesson 1: GitHub Repository Management

### **CRITICAL RULE: When user says "commit changes to main"**
- **ALWAYS** interpret this as committing to the **GitHub repository's main branch**
- **NEVER** assume it means local commits only
- **ALWAYS** push to the remote GitHub repository (dontque-glm in this case)
- **DO NOT** create pull requests unless explicitly requested

### **Key Understanding:**
- "Commit to main" = Push to GitHub repository's main branch
- "Locally" is only mentioned if user specifically says "commit locally"
- Default assumption is that commits should go to the remote repository

### **Common Mistakes to Avoid:**
1. ❌ Assuming "commit to main" means local only
2. ❌ Making local commits without pushing when user expects remote commits
3. ❌ Creating pull requests when not explicitly requested
4. ❌ Forgetting to force push when dealing with divergent branch histories

### **Correct Process:**
1. ✅ Make changes to files
2. ✅ Stage changes: `git add .`
3. ✅ Commit changes: `git commit -m "Descriptive message"`
4. ✅ Switch to main branch if needed: `git checkout main`
5. ✅ Push to GitHub: `git push origin main` (or force push if needed)
6. ✅ Verify changes are on GitHub repository

### **User Communication:**
- **ALWAYS** confirm when changes are committed to GitHub repository
- **NEVER** assume user wants local-only commits
- **BE EXPLICIT** about where commits are being made

---

## Additional Rules (to be updated as needed)

### **General Guidelines:**
- Listen carefully to user instructions
- Ask for clarification if unsure about requirements
- Document important lessons in this rule book
- Review rules before starting similar tasks

### **Technical Guidelines:**
- Always verify code quality with linter before committing
- Keep commit messages descriptive and professional
- Maintain clean git history
- Respect user's repository structure and preferences

---

**Last Updated:** 2025-08-08
**Context:** Dashboard redesign with modern professional colors for dontque-glm repository