# PRomance Setup Guide

## Quick Start

### 1. Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: PRomance (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (dev) or your production URL
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy your **Client ID**
6. Click "Generate a new client secret" and copy it

### 2. Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "PRomance API")
4. No scopes needed for public repos
5. Click "Generate token" and copy it

### 3. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your credentials
# Add the values you copied above:
# - GITHUB_ID (from OAuth App)
# - GITHUB_SECRET (from OAuth App)
# - GITHUB_TOKEN (Personal Access Token)
# - Generate NEXTAUTH_SECRET: openssl rand -base64 32
```

### 4. Install and Run

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

## Full Flow

1. **Login Screen** (`/login`)
   - User sees Bumble-style yellow UI
   - Clicks "Continue with GitHub"
   - Redirects to GitHub OAuth

2. **Onboarding** (`/onboarding`)
   - 4-step questionnaire:
     - Languages (JavaScript, TypeScript, Python, etc.)
     - Experience level (Beginner, Intermediate, Advanced)
     - Interests (Web Dev, ML, DevOps, etc.)
     - Issue types & daily goal

3. **Main App** (`/app`)
   - Three screens with bottom navigation:
     - **Discover**: Swipe on issues (Tinder-style cards)
     - **Matches**: View liked issues
     - **Profile**: See stats and preferences

## Smart Matching

Issues are sorted by match score (0-100):
- **40 points**: Language match
- **30 points**: Experience level match
- **20 points**: Issue type match
- **10 points**: Interest match

## Production Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `GITHUB_ID`
   - `GITHUB_SECRET`
   - `GITHUB_TOKEN`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
4. Update GitHub OAuth callback URL to production URL
5. Deploy!

## Features

- ✅ GitHub OAuth authentication
- ✅ Onboarding questionnaire
- ✅ Three-screen Bumble-style UI
- ✅ Smart issue matching
- ✅ Swipe interface with Framer Motion
- ✅ Profile management
- ✅ Match tracking
- ✅ Responsive design
- ✅ Yellow Bumble color scheme

## Tech Stack

- Next.js 15 with App Router
- NextAuth for GitHub OAuth
- Tailwind CSS v4
- Framer Motion animations
- Zustand state management
- Octokit GitHub API
- TypeScript
