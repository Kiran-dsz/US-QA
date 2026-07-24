#!/bin/bash

# PLAUD QA Test - One-Time Setup Script
# Run this once to set up /qauitest skill for Claude Code

echo "🚀 Setting up PLAUD QA Membership Center Test..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install puppeteer
  echo ""
fi

# Create skills directory if it doesn't exist
mkdir -p ~/.claude/skills

# Copy the skill file
echo "📋 Installing /qauitest skill..."
cp .claude/skills/qauitest.md ~/.claude/skills/qauitest.md

if [ $? -eq 0 ]; then
  echo "✅ Skill installed successfully!"
  echo ""
  echo "🎉 You're all set! You can now run:"
  echo "   /qauitest"
  echo ""
  echo "Optional: Update test credentials in:"
  echo "   tests/membership-center/qauitest.js"
  echo ""
  echo "For more info, see:"
  echo "   tests/membership-center/SETUP_FOR_COLLEAGUES.md"
else
  echo "❌ Failed to install skill"
  echo "Please try manually:"
  echo "   cp .claude/skills/qauitest.md ~/.claude/skills/qauitest.md"
  exit 1
fi
