'use client';

import { useState, useEffect } from 'react';
import { useIssueStore, GitHubIssue } from '@/lib/store';
import SwipeCard from '@/components/SwipeCard';
import ActionButtons from '@/components/ActionButtons';
import LikedIssuesModal from '@/components/LikedIssuesModal';
import { FaHeart, FaGithub, FaFilter } from 'react-icons/fa';

export default function Home() {
  const {
    issues,
    currentIndex,
    likedIssues,
    isLoading,
    showGoodFirstLove,
    setIssues,
    likeIssue,
    passIssue,
    nextIssue,
    setLoading,
    toggleGoodFirstLove,
  } = useIssueStore();

  const [showLikedModal, setShowLikedModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedLanguage) params.append('language', selectedLanguage);
      if (showGoodFirstLove) params.append('goodFirstOnly', 'true');

      const response = await fetch(`/api/issues?${params.toString()}`);
      const data = await response.json();
      setIssues(data.issues || []);
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [showGoodFirstLove, selectedLanguage]);

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

  const currentIssue = issues[currentIndex];
  const noMoreIssues = currentIndex >= issues.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-xl">
                <FaHeart className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  PRomance
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Find your perfect issue match
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="rust">Rust</option>
                <option value="go">Go</option>
                <option value="java">Java</option>
              </select>

              <button
                onClick={toggleGoodFirstLove}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  showGoodFirstLove
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                <FaFilter />
                💝 GoodFirstLove
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Swipe area */}
          <div className="relative h-[600px] mb-8">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading issues...</p>
                </div>
              </div>
            ) : noMoreIssues ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-2xl">
                  <FaGithub className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    No more issues!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    You've gone through all available issues.
                  </p>
                  <button
                    onClick={fetchIssues}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Load More Issues
                  </button>
                </div>
              </div>
            ) : (
              <>
                {issues.slice(currentIndex, currentIndex + 3).map((issue, index) => (
                  <SwipeCard
                    key={issue.id}
                    issue={issue}
                    onSwipeLeft={index === 0 ? handlePass : () => {}}
                    onSwipeRight={index === 0 ? handleLike : () => {}}
                    style={{
                      zIndex: 3 - index,
                      scale: 1 - index * 0.05,
                      opacity: 1 - index * 0.2,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Action buttons */}
          {!isLoading && !noMoreIssues && (
            <ActionButtons
              onPass={handlePass}
              onLike={handleLike}
              onViewLiked={() => setShowLikedModal(true)}
              likedCount={likedIssues.length}
            />
          )}

          {/* Stats */}
          <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {issues.length - currentIndex}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {likedIssues.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Matches</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                  {currentIndex}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reviewed</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Liked issues modal */}
      <LikedIssuesModal
        isOpen={showLikedModal}
        onClose={() => setShowLikedModal(false)}
        issues={likedIssues}
      />
    </div>
  );
}
