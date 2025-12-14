'use client';

import { signIn } from 'next-auth/react';
import { FaGithub, FaHeart } from 'react-icons/fa';
import { theme } from '@/lib/theme';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: `linear-gradient(135deg, ${theme.colors.bgLight} 0%, ${theme.colors.secondary} 100%)` }}
    >
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <FaHeart className="text-4xl text-white" />
          </div>
          <h1
            className="text-5xl font-bold mb-3"
            style={{ color: theme.colors.textPrimary }}
          >
            PRomance
          </h1>
          <p
            className="text-xl"
            style={{ color: theme.colors.textSecondary }}
          >
            Find your perfect GitHub issue match
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-3xl p-8 shadow-2xl"
          style={{ backgroundColor: theme.colors.bgWhite }}
        >
          <h2
            className="text-2xl font-bold mb-2 text-center"
            style={{ color: theme.colors.textPrimary }}
          >
            Welcome!
          </h2>
          <p
            className="text-center mb-8"
            style={{ color: theme.colors.textSecondary }}
          >
            Sign in with GitHub to start swiping on issues
          </p>

          <button
            onClick={() => signIn('github', { callbackUrl: '/onboarding' })}
            className="w-full py-4 px-6 rounded-full font-semibold text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{
              backgroundColor: theme.colors.textPrimary,
              color: theme.colors.bgWhite,
            }}
          >
            <FaGithub className="text-2xl" />
            Continue with GitHub
          </button>

          <div className="mt-8 text-center">
            <p
              className="text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              By continuing, you agree to our Terms of Service
              <br />
              and Privacy Policy
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div>
            <div
              className="text-3xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              30+
            </div>
            <div
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Languages
            </div>
          </div>
          <div>
            <div
              className="text-3xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              1000s
            </div>
            <div
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Issues
            </div>
          </div>
          <div>
            <div
              className="text-3xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              Smart
            </div>
            <div
              className="text-sm"
              style={{ color: theme.colors.textSecondary }}
            >
              Matching
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
