# 🚀 Deployment Guide

## Production URL
**https://maximus-1mwiwweyn-pranavpipariyas-projects.vercel.app**

## ⚡ Quick Setup (5 minutes)

### 1. Add Environment Variables to Vercel

Go to: **https://vercel.com/pranavpipariyas-projects/maximus/settings/environment-variables**

Add these variables (copy from your `.env.local`):

```env
GITHUB_TOKEN=<your_github_token_from_env_local>
GITHUB_ID=<your_github_id_from_env_local>
GITHUB_SECRET=<your_github_secret_from_env_local>
NEXTAUTH_SECRET=<generate_with_openssl_rand_-base64_32>
NEXTAUTH_URL=https://maximus-1mwiwweyn-pranavpipariyas-projects.vercel.app
```

**For each variable:**
1. Click "Add New"
2. Enter Name (e.g., `GITHUB_TOKEN`)
3. Enter Value
4. Select all environments (Production, Preview, Development)
5. Click "Save"

### 2. Update GitHub OAuth App

Go to: **https://github.com/settings/developers**

Find your OAuth app (check your `.env.local` for the GITHUB_ID)

Update the **Authorization callback URL** to:
```
https://maximus-1mwiwweyn-pranavpipariyas-projects.vercel.app/api/auth/callback/github
```

### 3. Generate NEXTAUTH_SECRET (if you haven't)

Run locally:
```bash
openssl rand -base64 32
```

Copy the output and add it as `NEXTAUTH_SECRET` in Vercel.

### 4. Redeploy

After adding all environment variables:

**Option A - Via Dashboard:**
1. Go to https://vercel.com/pranavpipariyas-projects/maximus
2. Click "Deployments"
3. Click the three dots on the latest deployment
4. Click "Redeploy"

**Option B - Via CLI:**
```bash
vercel --prod --yes
```

## ✅ Verify It Works

1. Visit: https://maximus-1mwiwweyn-pranavpipariyas-projects.vercel.app
2. Click "Continue with GitHub"
3. Should redirect to GitHub OAuth
4. After auth, should go to onboarding
5. Complete onboarding and swipe!

## 🌐 Make It Public

The Vercel deployment is **already public** - anyone with the link can access it!

No additional configuration needed. The app is open to everyone.

## 🎯 Custom Domain (Optional)

To get a simpler URL like `promance.vercel.app`:

1. Go to https://vercel.com/pranavpipariyas-projects/maximus/settings/domains
2. Click "Add"
3. Enter your desired domain (e.g., `promance.vercel.app`)
4. Update `NEXTAUTH_URL` environment variable to the new domain
5. Update GitHub OAuth callback URL to the new domain

## 📊 Features Now Live

✅ **Endless Feed** - Never runs out of issues (auto-loads 300 at a time)
✅ **Smart Matching** - Issues sorted by compatibility score
✅ **GitHub OAuth** - Sign in with GitHub account
✅ **Bumble UI** - Yellow color scheme, 3 screens, bottom nav
✅ **Profile System** - Onboarding questionnaire with preferences
✅ **Swipe Interface** - Tinder-style cards with animations

## 🐛 Troubleshooting

**Issue: "Sign in error"**
- Check GITHUB_ID and GITHUB_SECRET are correct
- Verify callback URL matches in GitHub OAuth app

**Issue: "Failed to fetch issues"**
- Check GITHUB_TOKEN is valid and not expired
- Verify it has no expiration or regenerate it

**Issue: NextAuth errors**
- Make sure NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your production URL exactly

## 🎉 You're Live!

Your dating app for GitHub issues is now live and public at:
**https://maximus-1mwiwweyn-pranavpipariyas-projects.vercel.app**

Share the link with anyone - no access request needed! 🚀
