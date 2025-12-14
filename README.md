# 💛 PRomance

**Find your perfect GitHub issue match - Tinder for open source!**

PRomance is a **Bumble-style dating app** for discovering GitHub issues. Sign in with GitHub, create your developer profile, and swipe through issues matched to your skills. It's like Tinder, but for finding your next open-source contribution!

**🌐 Live Demo**: [https://maximus-pranavpipariyas-projects.vercel.app](https://maximus-pranavpipariyas-projects.vercel.app)

---

## ✨ Features

### 🎨 Bumble-Inspired UI
- **Signature yellow color scheme** with warm cream backgrounds (#FFC629)
- **Three-screen layout**: Discover, Matches, Profile
- **Bottom navigation** like dating apps
- **Professional typography** and smooth animations
- Mobile-optimized for the best dating app experience

### 🔐 GitHub OAuth Authentication
- Sign in with your GitHub account
- Secure session management with NextAuth
- Access your GitHub data safely

### 📋 Smart Onboarding
**4-step questionnaire**:
1. Select your programming languages
2. Choose experience level (Beginner/Intermediate/Advanced)
3. Pick your interests (Web Dev, ML, DevOps, etc.)
4. Select issue types and daily goal

### 🎯 Intelligent Matching Algorithm
- **Smart algorithm** scores issues 0-100 based on:
  - **Language match** (40 points)
  - **Experience level** (30 points)
  - **Issue type** (20 points)
  - **Interests** (10 points)
- Issues sorted by best match first
- **GoodFirstLove** badge for beginner-friendly issues

### 💖 Dating App Experience
- **Swipe interface** with Framer Motion animations
- Beautiful gradient cards with clean typography
- Swipe right to match, left to pass
- **Endless feed** - auto-loads issues as you swipe
- View all your matches
- Track your contribution stats

### 🤖 MCP Integration
- Claude AI integration via Model Context Protocol
- Natural language issue discovery
- "Claude, find me 10 TypeScript issues for beginners"

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- GitHub account

### 1. Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: PRomance
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy your **Client ID** and **Client Secret**

### 2. Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "PRomance API"
4. No scopes needed for public repos
5. Generate and copy the token

### 3. Install and Configure

```bash
# Clone the repository
git clone https://github.com/PranavPipariya/promance.git
cd promance

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local

# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Edit .env.local with your credentials:
# - GITHUB_ID (OAuth Client ID)
# - GITHUB_SECRET (OAuth Client Secret)
# - GITHUB_TOKEN (Personal Access Token)
# - NEXTAUTH_SECRET (generated above)
# - NEXTAUTH_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start swiping!

---

## 📦 Deployment to Vercel

### 1. Add Environment Variables

Go to your Vercel project settings → Environment Variables

Add all 5 variables (check Production, Preview, Development):
- `GITHUB_TOKEN` - Your GitHub Personal Access Token
- `GITHUB_ID` - OAuth App Client ID
- `GITHUB_SECRET` - OAuth App Client Secret
- `NEXTAUTH_SECRET` - Generated with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)

### 2. Update GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click your OAuth app
3. Update **Authorization callback URL** to:
   ```
   https://your-app.vercel.app/api/auth/callback/github
   ```
4. Update **Homepage URL** to: `https://your-app.vercel.app`
5. Save changes

### 3. Deploy

```bash
vercel --prod
```

Or push to GitHub and Vercel will auto-deploy!

---

## 🤖 MCP Server Setup

PRomance includes an MCP (Model Context Protocol) server for Claude AI integration.

### Installation

```bash
cd mcp-server
pnpm install
pnpm build
```

### Configure Claude Desktop

Add to your `claude_desktop_config.json`:

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

- `find_issues` - Search for issues by language and filters
- `get_issue_details` - Get detailed info about a specific issue
- `search_beginner_issues` - Find GoodFirstLove issues

### Example Usage

```
You: "Claude, find me 10 TypeScript issues that are good for beginners"
Claude: [Uses find_issues tool with language=typescript, goodFirstOnly=true]

You: "Claude, get details about issue #123 from owner/repo"
Claude: [Uses get_issue_details tool]
```

---

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router & Turbopack
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand with persist
- **Authentication**: NextAuth.js
- **GitHub API**: Octokit
- **Icons**: React Icons
- **TypeScript**: Full type safety
- **MCP**: Model Context Protocol SDK

---

## 📂 Project Structure

```
promance/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth configuration
│   │   └── issues/route.ts         # GitHub API integration
│   ├── login/page.tsx               # Login screen
│   ├── onboarding/page.tsx          # 4-step questionnaire
│   ├── app/
│   │   ├── page.tsx                 # Discover (swipe screen)
│   │   ├── matches/page.tsx         # Matches screen
│   │   └── profile/page.tsx         # Profile screen
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── IssueCard.tsx                # Swipeable issue card
│   └── BottomNav.tsx                # Bottom navigation
├── lib/
│   ├── store.ts                     # Issue state (Zustand)
│   ├── userStore.ts                 # User profile state
│   ├── matching.ts                  # Matching algorithm
│   └── theme.ts                     # Bumble color scheme
├── mcp-server/
│   ├── index.ts                     # MCP server implementation
│   ├── package.json
│   └── tsconfig.json
└── public/
```

---

## 🎯 The PRomance Flow

1. **Login** (`/login`) - Bumble-style yellow gradient with GitHub OAuth
2. **Onboarding** (`/onboarding`) - 4-step profile creation with progress bar
3. **Discover** (`/app`) - Swipe on matched issues (main screen)
4. **Matches** (`/app/matches`) - View all your liked issues with links to GitHub
5. **Profile** (`/app/profile`) - See stats, preferences, and sign out

---

## 🤝 Contributing

Contributions are welcome! This is a hackathon project, but we're happy to accept PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this project however you'd like!

---

## 🙏 Acknowledgments

- Built for the Marvel-themed WeMakeDevs Hackathon
- Inspired by the need to make open-source contribution discovery fun
- Special thanks to Bumble for the design inspiration
- Thanks to the open-source community

---

## 🔗 Links

- **Live Demo**: [https://maximus-pranavpipariyas-projects.vercel.app](https://maximus-pranavpipariyas-projects.vercel.app)
- **GitHub**: [https://github.com/PranavPipariya/promance](https://github.com/PranavPipariya/promance)
- **Hackathon**: [WeMakeDevs Hackathon](https://hackathon.wemakedevs.org)

---

Made with 💛 by Pranav

**Find your perfect issue match and fall in love with open source!**
