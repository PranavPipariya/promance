'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useIssueStore } from '@/lib/store';
import { useUserStore } from '@/lib/userStore';
import { theme } from '@/lib/theme';
import { FaHeart, FaExternalLinkAlt, FaGithub, FaClock } from 'react-icons/fa';

export default function MatchesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useUserStore();
  const { likedIssues } = useIssueStore();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && (!user || !user.onboardingComplete)) {
      router.push('/onboarding');
    }
  }, [status, user, router]);

  if (status === 'loading' || !user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.colors.bgLight }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mx-auto mb-4"
            style={{ borderColor: theme.colors.primary }}
          />
          <p style={{ color: theme.colors.textSecondary }}>Loading...</p>
        </div>
      </div>
    );
  }

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const created = new Date(date);
    const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.bgLight }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{
          backgroundColor: theme.colors.bgWhite,
          borderColor: theme.colors.border,
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <FaHeart className="text-white text-xl" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: theme.colors.textPrimary }}
              >
                Your Matches
              </h1>
              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {likedIssues.length} issues you loved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {likedIssues.length === 0 ? (
          <div
            className="rounded-3xl p-12 text-center"
            style={{ backgroundColor: theme.colors.bgWhite }}
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ backgroundColor: theme.colors.bgGray }}
            >
              <FaHeart
                className="text-4xl"
                style={{ color: theme.colors.textMuted }}
              />
            </div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: theme.colors.textPrimary }}
            >
              No matches yet
            </h2>
            <p className="mb-6" style={{ color: theme.colors.textSecondary }}>
              Start swiping to find issues you love!
            </p>
            <button
              onClick={() => router.push('/app')}
              className="py-3 px-8 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.bgWhite,
              }}
            >
              Start Swiping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {likedIssues.map((issue) => (
              <div
                key={issue.id}
                className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: theme.colors.bgWhite }}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={issue.user.avatar_url}
                    alt={issue.user.login}
                    className="w-12 h-12 rounded-full ring-2 ring-yellow-400"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FaGithub
                        className="flex-shrink-0"
                        style={{ color: theme.colors.textSecondary }}
                      />
                      <span
                        className="text-sm font-medium truncate"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {issue.repo_name}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold line-clamp-2"
                      style={{ color: theme.colors.textPrimary }}
                    >
                      {issue.title}
                    </h3>
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-full whitespace-nowrap"
                    style={{
                      backgroundColor: theme.colors.bgGray,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    <FaClock />
                    {getTimeAgo(issue.created_at)}
                  </div>
                </div>

                {/* Labels */}
                {issue.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {issue.labels.slice(0, 4).map((label) => (
                      <span
                        key={label.name}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `#${label.color}15`,
                          color: `#${label.color}`,
                          border: `1px solid #${label.color}30`,
                        }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Body preview */}
                {issue.body && (
                  <p
                    className="text-sm line-clamp-2 mb-4"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {issue.body}
                  </p>
                )}

                {/* Action button */}
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.bgWhite,
                  }}
                >
                  Open on GitHub
                  <FaExternalLinkAlt />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
