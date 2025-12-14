'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useIssueStore, GitHubIssue } from '@/lib/store';
import { useUserStore } from '@/lib/userStore';
import { sortIssuesByMatch } from '@/lib/matching';
import IssueCard from '@/components/IssueCard';
import { theme } from '@/lib/theme';
import { FaFilter, FaRedo, FaTimes, FaHeart } from 'react-icons/fa';

export default function DiscoverPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useUserStore();
  const {
    issues,
    currentIndex,
    likedIssues,
    isLoading,
    currentPage,
    hasMore,
    setIssues,
    addIssues,
    likeIssue,
    passIssue,
    nextIssue,
    setLoading,
    setPage,
    setHasMore,
  } = useIssueStore();

  const [showFilters, setShowFilters] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && (!user || !user.onboardingComplete)) {
      router.push('/onboarding');
    }
  }, [status, user, router]);

  const fetchIssues = async (page = 1, append = false) => {
    if (!user) return;

    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const params = new URLSearchParams();
      if (user.languages.length > 0) {
        params.append('language', user.languages[0]); // Use first language
      }
      params.append('page', page.toString());

      const response = await fetch(`/api/issues?${params.toString()}`);
      const data = await response.json();

      // Sort by match score
      const sortedIssues = sortIssuesByMatch(data.issues || [], user);

      if (append) {
        addIssues(sortedIssues);
      } else {
        setIssues(sortedIssues);
      }

      setHasMore(data.hasMore ?? true);
      setPage(page);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMoreIssues = async () => {
    if (!hasMore || isLoadingMore) return;
    await fetchIssues(currentPage + 1, true);
  };

  useEffect(() => {
    if (user && user.onboardingComplete) {
      fetchIssues();
    }
  }, [user]);

  // Auto-load more issues when getting close to the end
  useEffect(() => {
    const remainingIssues = issues.length - currentIndex;
    if (remainingIssues <= 10 && hasMore && !isLoadingMore && !isLoading && user) {
      loadMoreIssues();
    }
  }, [currentIndex, issues.length, hasMore, isLoadingMore, isLoading, user]);

  const handleLike = () => {
    const currentIssue = issues[currentIndex];
    if (currentIssue) {
      likeIssue(currentIssue);
      nextIssue();
    }
  };

  const handlePass = () => {
    const currentIssue = issues[currentIndex];
    if (currentIssue) {
      passIssue(currentIssue);
      nextIssue();
    }
  };

  const noMoreIssues = currentIndex >= issues.length;

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
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{
          backgroundColor: theme.colors.bgWhite,
          borderColor: theme.colors.border,
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold"
            style={{ color: theme.colors.textPrimary }}
          >
            Discover
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full"
            style={{
              backgroundColor: theme.colors.bgGray,
              color: theme.colors.textPrimary,
            }}
          >
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Swipe area */}
        <div className="relative h-[600px] mb-6">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4"
                  style={{ borderColor: theme.colors.primary }}
                />
                <p style={{ color: theme.colors.textSecondary }}>Finding your matches...</p>
              </div>
            </div>
          ) : noMoreIssues ? (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-3xl p-12"
              style={{ backgroundColor: theme.colors.bgWhite }}
            >
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <FaRedo className="text-4xl text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textPrimary }}>
                  That's all for now!
                </h2>
                <p className="mb-6" style={{ color: theme.colors.textSecondary }}>
                  Check back later for more issues
                </p>
                <button
                  onClick={() => fetchIssues()}
                  className="py-3 px-8 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.bgWhite,
                  }}
                >
                  Reload Issues
                </button>
              </div>
            </div>
          ) : (
            <>
              {issues.slice(currentIndex, currentIndex + 3).map((issue, index) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onSwipeLeft={index === 0 ? handlePass : () => {}}
                  onSwipeRight={index === 0 ? handleLike : () => {}}
                  style={{
                    zIndex: 3 - index,
                    scale: 1 - index * 0.03,
                    opacity: 1 - index * 0.15,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Action buttons */}
        {!isLoading && !noMoreIssues && (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePass}
              className="p-6 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: theme.colors.bgWhite,
                color: '#EF4444',
              }}
            >
              <FaTimes className="text-3xl" />
            </button>

            <button
              onClick={handleLike}
              className="p-8 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.bgWhite,
              }}
            >
              <FaHeart className="text-4xl" />
            </button>
          </div>
        )}

        {/* Stats */}
        <div
          className="mt-8 rounded-2xl p-6"
          style={{ backgroundColor: theme.colors.bgWhite }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p
                className="text-3xl font-bold"
                style={{ color: theme.colors.primary }}
              >
                {issues.length - currentIndex}
              </p>
              <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                Remaining
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold"
                style={{ color: theme.colors.success }}
              >
                {likedIssues.length}
              </p>
              <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                Matches
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold"
                style={{ color: theme.colors.textPrimary }}
              >
                {currentIndex}
              </p>
              <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                Reviewed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
