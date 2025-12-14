'use client';

import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useUserStore } from '@/lib/userStore';
import { useIssueStore } from '@/lib/store';
import { theme } from '@/lib/theme';
import { FaGithub, FaHeart, FaFire, FaSignOutAlt, FaCog, FaCode, FaStar } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, logout: logoutUser } = useUserStore();
  const { likedIssues, currentIndex, reset } = useIssueStore();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && (!user || !user.onboardingComplete)) {
      router.push('/onboarding');
    }
  }, [status, user, router]);

  const handleLogout = async () => {
    reset();
    logoutUser();
    await signOut({ callbackUrl: '/login' });
  };

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

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.bgLight }}
    >
      {/* Header with gradient */}
      <div
        className="pt-12 pb-20 px-4"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-white shadow-xl"
          />
          <h1 className="text-3xl font-bold text-white mb-2">
            {user.name || user.login}
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/90 mb-4">
            <FaGithub />
            <span>@{user.login}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            <FaStar />
            {user.experienceLevel.charAt(0).toUpperCase() + user.experienceLevel.slice(1)} Developer
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-2xl mx-auto px-4 -mt-12 mb-6">
        <div
          className="rounded-2xl p-6 shadow-xl"
          style={{ backgroundColor: theme.colors.bgWhite }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: theme.colors.primary }}
              >
                {currentIndex}
              </div>
              <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                Reviewed
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: theme.colors.success }}
              >
                {likedIssues.length}
              </div>
              <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                Matches
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: theme.colors.accent }}
              >
                {user.dailyGoal}
              </div>
              <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                Daily Goal
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="max-w-2xl mx-auto px-4 pb-6 space-y-4">
        {/* Languages */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: theme.colors.bgWhite }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FaCode style={{ color: theme.colors.primary }} />
            <h2
              className="text-lg font-bold"
              style={{ color: theme.colors.textPrimary }}
            >
              Languages
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.languages.map((lang) => (
              <span
                key={lang}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: theme.colors.bgGray,
                  color: theme.colors.textPrimary,
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: theme.colors.bgWhite }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FaFire style={{ color: theme.colors.primary }} />
            <h2
              className="text-lg font-bold"
              style={{ color: theme.colors.textPrimary }}
            >
              Interests
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: theme.colors.bgGray,
                  color: theme.colors.textPrimary,
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Issue Types */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: theme.colors.bgWhite }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FaHeart style={{ color: theme.colors.primary }} />
            <h2
              className="text-lg font-bold"
              style={{ color: theme.colors.textPrimary }}
            >
              Preferred Work
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.issueTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: theme.colors.bgGray,
                  color: theme.colors.textPrimary,
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/onboarding')}
            className="w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: theme.colors.bgWhite,
              color: theme.colors.textPrimary,
            }}
          >
            <FaCog />
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: theme.colors.bgWhite,
              color: '#EF4444',
            }}
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
