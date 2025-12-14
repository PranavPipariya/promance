# PRomance - Hackathon Submission Guide

## Project Overview

**PRomance** is a dating app-style interface for discovering GitHub issues. Swipe right to match with issues you want to work on, swipe left to pass.

### Key Features
- 🎯 Tinder-style swipe interface for GitHub issues
- 💝 **GoodFirstLove** filter for beginner-friendly issues
- 🎨 Language filtering (JavaScript, TypeScript, Python, Rust, Go, Java)
- 📊 Match tracking system
- 🤖 MCP server for Claude AI integration
- 🎭 Beautiful gradient UI with smooth animations

## Prize Targets

### ✅ Stormbreaker Deployment Award - $2,000
**Status: COMPLETE**

- **Live Deployment**: https://maximus-k0ma0y40y-pranavpipariyas-projects.vercel.app
- **Vercel Project**: Deployed and live
- **Requirement**: "Any standard Vercel deployment qualifies" ✓

**Action Needed**: Add GitHub token to Vercel
```bash
# Go to Vercel dashboard:
# https://vercel.com/pranavpipariyas-projects/maximus

# Settings → Environment Variables → Add:
# Name: GITHUB_TOKEN
# Value: your_github_token_here
# Environments: Production, Preview, Development
```

### ✅ Captain Code Award - $1,000
**Status: READY FOR CODERABBIT**

- **GitHub Repo**: https://github.com/PranavPipariya/promance
- **Sample PR**: https://github.com/PranavPipariya/promance/pull/1
- **Documentation**: CONTRIBUTING.md, CODERABBIT_SETUP.md added

**Action Needed**: Install CodeRabbit
1. Go to https://github.com/apps/coderabbitai
2. Click "Install"
3. Select repository: `PranavPipariya/promance`
4. CodeRabbit will automatically review PR #1
5. Create more PRs to show CodeRabbit activity

### 🎯 Wakanda Data Award - $4,000
**Status: POTENTIAL**

**Requirement**: Use Kestra's AI Agent to summarize data

**Implementation Idea**:
- Use Kestra to aggregate GitHub issue data
- AI Agent summarizes trending issues by language
- AI Agent decides which issues to prioritize
- Feed this data into PRomance

**Next Steps**:
1. Set up Kestra account
2. Create workflow to fetch GitHub data
3. Use AI Agent to analyze and summarize
4. Integrate with PRomance API

### 🎯 Infinity Build Award - $5,000
**Status: FOUNDATION BUILT**

**Requirement**: Use Cline CLI to build automation tools

**What We Have**:
- ✅ MCP server built for CLI interaction
- ✅ Tools for finding issues, getting details

**Enhancement Ideas**:
1. Use Cline CLI to auto-generate PRs for matched issues
2. Automate issue analysis and compatibility checking
3. Auto-setup development environment for matched repos

## MCP Server Demo

The MCP server allows you to interact with PRomance through Claude:

### Setup MCP Server
```bash
cd mcp-server
pnpm install
pnpm build
```

### Configure Claude Desktop
Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "promance": {
      "command": "node",
      "args": ["/path/to/promance/mcp-server/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

### Demo Commands
```
You: "Claude, find me 10 TypeScript issues for beginners"
You: "Claude, search for good-first-issue in Python projects"
You: "Claude, get details about issue #123 from facebook/react"
```

## Submission Checklist

### Required
- [x] GitHub Repository: https://github.com/PranavPipariya/promance
- [x] Public repo with visible commit history
- [x] README.md with project explanation
- [x] Setup instructions and usage details
- [ ] 2-minute demo video (RECORD THIS!)
- [x] Deployment (Vercel)

### Prize-Specific
- [x] Vercel deployment live (Stormbreaker - $2,000)
- [ ] CodeRabbit installed and active (Captain Code - $1,000)
- [ ] Kestra AI Agent integration (Wakanda - $4,000)
- [ ] Cline CLI automation (Infinity Build - $5,000)

## Demo Video Script (2 minutes)

**0:00-0:20** - Introduction
- "Hi! I'm presenting PRomance - a dating app for GitHub issues"
- "Swipe right on issues you want to work on, left to pass"

**0:20-0:50** - Core Features
- Show the swipe interface
- Demonstrate GoodFirstLove filter
- Show language filtering
- Display matched issues

**0:50-1:20** - MCP Integration
- Open Claude
- "Claude, find me 10 TypeScript issues for beginners"
- Show Claude using the MCP tools
- Explain how this improves developer workflow

**1:20-1:50** - Tech Stack & Prizes
- "Built with Next.js 15, Tailwind CSS, Framer Motion"
- "Deployed on Vercel (Stormbreaker Award)"
- "CodeRabbit integration (Captain Code Award)"
- "MCP server for AI integration"

**1:50-2:00** - Closing
- "Making open source contribution discovery fun!"
- "GitHub: PranavPipariya/promance"

## Next Steps to Maximize Prizes

1. **Add GitHub Token to Vercel** (5 minutes)
   - Ensures the live app works properly
   - Get token from https://github.com/settings/tokens

2. **Install CodeRabbit** (5 minutes)
   - Go to https://github.com/apps/coderabbitai
   - Install on the repo
   - Instant $1,000 prize eligibility!

3. **Record Demo Video** (30 minutes)
   - Use Loom or OBS
   - Follow the script above
   - Keep it under 2 minutes
   - Make it engaging!

4. **Optional: Kestra Integration** (2-3 hours)
   - High value: $4,000 prize
   - Create workflow to aggregate issue data
   - Use AI Agent to summarize and decide
   - Show in demo

5. **Optional: Cline CLI Enhancement** (2-3 hours)
   - Highest value: $5,000 prize
   - Build auto-PR generation
   - Create dev environment automation
   - Demonstrate in video

## Current Prize Total

**Guaranteed** (with CodeRabbit): $3,000
- Stormbreaker: $2,000
- Captain Code: $1,000

**Potential** (with Kestra): $7,000
**Potential** (with Cline): $12,000

## Links

- **Live App**: https://maximus-k0ma0y40y-pranavpipariyas-projects.vercel.app
- **GitHub**: https://github.com/PranavPipariya/promance
- **Demo PR**: https://github.com/PranavPipariya/promance/pull/1
- **Vercel Dashboard**: https://vercel.com/pranavpipariyas-projects/maximus

---

Made with 💝 using Claude Code

*Find your perfect issue match and fall in love with open source!*
