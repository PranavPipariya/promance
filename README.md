# 💛 PRomance

**Find your perfect GitHub issue match - Tinder for open source!**

PRomance is a **Bumble-style dating app** for discovering GitHub issues. Sign in with GitHub, create your developer profile, and swipe through issues matched to your skills. It's like Tinder, but for finding your next open-source contribution!

## ✨ Features

### 🎨 Bumble-Inspired UI
- **Signature yellow color scheme** (#FFC629)
- **Three-screen layout**: Discover, Matches, Profile
- **Bottom navigation** like dating apps
- **Professional typography** and smooth animations

### 🔐 GitHub OAuth Authentication
- Sign in with your GitHub account
- Secure session management
- Access your GitHub data

### 📋 Smart Onboarding
- **4-step questionnaire**:
  1. Select your programming languages
  2. Choose experience level (Beginner/Intermediate/Advanced)
  3. Pick your interests (Web Dev, ML, DevOps, etc.)
  4. Select issue types and daily goal

### 🎯 Intelligent Matching
- **Smart algorithm** scores issues 0-100 based on:
  - Language match (40 points)
  - Experience level (30 points)
  - Issue type (20 points)
  - Interests (10 points)
- Issues sorted by best match first
- **GoodFirstLove** highlighting for beginners

### 💖 Dating App Experience
- **Swipe interface** with Framer Motion animations
- Beautiful gradient cards with proper fonts
- Swipe right to match, left to pass
- View all your matches
- Track your stats

### 🤖 MCP Integration
- Claude AI integration for natural language issue discovery
- "Claude, find me 10 TypeScript issues for beginners"

## 🎥 Demo

*Demo video coming soon!*

## 🚀 Getting Started

See [SETUP.md](./SETUP.md) for detailed setup instructions.

### Quick Start

1. **Create GitHub OAuth App** at https://github.com/settings/developers
2. **Get a GitHub token** at https://github.com/settings/tokens
3. **Clone and setup**:
```bash
git clone https://github.com/PranavPipariya/promance.git
cd promance
pnpm install
cp .env.example .env.local
# Edit .env.local with your credentials
pnpm dev
```
4. **Open** http://localhost:3000

### The Flow

1. **Login** → GitHub OAuth
2. **Onboarding** → 4-step profile creation
3. **Discover** → Swipe on matched issues
4. **Matches** → View your liked issues
5. **Profile** → See stats and preferences

## 🤖 MCP Server Setup

PRomance includes an MCP (Model Context Protocol) server for Claude AI integration.

### Installation

1. Navigate to the MCP server directory:
```bash
cd mcp-server
pnpm install
```

2. Build the MCP server:
```bash
pnpm build
```

3. Configure Claude Desktop to use the MCP server by adding to your `claude_desktop_config.json`:
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

### Available MCP Tools

- `find_issues`: Search for issues by language and filters
- `get_issue_details`: Get detailed info about a specific issue
- `search_beginner_issues`: Find GoodFirstLove issues

### Example Usage with Claude

```
You: "Claude, find me 10 TypeScript issues that are good for beginners"
Claude: [Uses find_issues tool with language=typescript, goodFirstOnly=true]

You: "Claude, get details about issue #123 from owner/repo"
Claude: [Uses get_issue_details tool]
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **GitHub API**: Octokit
- **Icons**: React Icons
- **TypeScript**: Full type safety
- **MCP**: Model Context Protocol SDK

## 📂 Project Structure

```
promance/
├── app/
│   ├── api/
│   │   └── issues/
│   │       └── route.ts          # GitHub API integration
│   ├── layout.tsx
│   └── page.tsx                   # Main swipe interface
├── components/
│   ├── SwipeCard.tsx              # Issue card component
│   ├── ActionButtons.tsx          # Swipe action buttons
│   └── LikedIssuesModal.tsx       # Matches modal
├── lib/
│   └── store.ts                   # Zustand state management
├── mcp-server/
│   ├── index.ts                   # MCP server implementation
│   ├── package.json
│   └── tsconfig.json
└── public/
```

## 🎯 Hackathon Prize Categories

This project is designed to qualify for multiple prizes:

### ✅ Stormbreaker Deployment Award ($2,000)
- ✅ Deployed on Vercel
- ✅ Live and functional

### ✅ Captain Code Award ($1,000)
- ✅ CodeRabbit integration for PR reviews
- ✅ High code quality standards
- ✅ Comprehensive documentation

### 🎯 Wakanda Data Award ($4,000) - In Progress
- 🔄 Kestra AI Agent integration coming soon

### 🎯 Infinity Build Award ($5,000) - Potential
- ✅ MCP server built for CLI interaction
- 🔄 Could extend with Cline CLI automation

## 🤝 Contributing

Contributions are welcome! This is a hackathon project, but we're happy to accept PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🙏 Acknowledgments

- Built for the Marvel-themed WeMakeDevs Hackathon
- Inspired by the need to make open-source contribution discovery fun
- Special thanks to the open-source community

## 🔗 Links

- [Live Demo](https://promance.vercel.app) *(coming soon)*
- [GitHub](https://github.com/yourusername/promance)
- [Hackathon Page](https://hackathon.wemakedevs.org)

---

Made with 💝 by [Your Name]

*Find your perfect issue match and fall in love with open source!*
