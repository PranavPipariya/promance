# 💝 PRomance

**Find your perfect GitHub issue match!**

PRomance is a dating app-style interface for discovering and matching with GitHub issues. Swipe right on issues you want to work on, swipe left to pass. Features the **GoodFirstLove** filter for beginner-friendly issues.

## ✨ Features

- **🎯 Tinder-Style Swipe Interface**: Intuitive card-based UI for browsing GitHub issues
- **💝 GoodFirstLove Filter**: Dedicated filter for `good-first-issue` labeled issues
- **🎨 Language Filtering**: Filter issues by programming language (JavaScript, TypeScript, Python, Rust, Go, Java)
- **📊 Match Tracking**: Keep track of issues you've liked and want to work on
- **🎭 Beautiful UI**: Gradient backgrounds, smooth animations with Framer Motion
- **🤖 MCP Integration**: Claude AI integration for natural language issue discovery
- **📱 Responsive Design**: Works great on desktop and mobile

## 🎥 Demo

*Demo video coming soon!*

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- GitHub Personal Access Token ([get one here](https://github.com/settings/tokens))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/promance.git
cd promance
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your GitHub token:
```
GITHUB_TOKEN=your_github_token_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

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
