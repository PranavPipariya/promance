'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { GitHubIssue } from '@/lib/store';
import { FaHeart, FaTimes, FaGithub, FaComments, FaClock } from 'react-icons/fa';
import { useState } from 'react';

interface SwipeCardProps {
  issue: GitHubIssue;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  style?: React.CSSProperties;
}

export default function SwipeCard({ issue, onSwipeLeft, onSwipeRight, style }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 200 : -200);
      if (info.offset.x > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
  };

  const isGoodFirstIssue = issue.labels.some(label =>
    label.name.toLowerCase().includes('good first issue') ||
    label.name.toLowerCase().includes('good-first-issue') ||
    label.name.toLowerCase().includes('beginner')
  );

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const created = new Date(date);
    const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <motion.div
      className="absolute w-full h-full"
      style={{
        x,
        rotate,
        opacity,
        ...style,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl h-full overflow-hidden border-2 border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 line-clamp-2">{issue.title}</h2>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <FaGithub />
                <span className="truncate">{issue.repo_name || 'Repository'}</span>
              </div>
            </div>
            {isGoodFirstIssue && (
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2">
                💝 GoodFirstLove
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <FaClock />
              <span>{getTimeAgo(issue.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaComments />
              <span>{issue.comments}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 280px)' }}>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {issue.body || 'No description provided.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {issue.labels.slice(0, 5).map((label) => (
              <span
                key={label.name}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `#${label.color}20`,
                  color: `#${label.color}`,
                  border: `1px solid #${label.color}40`,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <img
              src={issue.user.avatar_url}
              alt={issue.user.login}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              @{issue.user.login}
            </span>
          </div>
        </div>
      </div>

      {/* Swipe indicators */}
      <motion.div
        className="absolute top-12 right-12 bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-2xl rotate-12 border-4 border-red-600"
        style={{ opacity: useTransform(x, [-200, -50], [1, 0]) }}
      >
        <FaTimes className="inline mr-2" />
        PASS
      </motion.div>

      <motion.div
        className="absolute top-12 left-12 bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-2xl -rotate-12 border-4 border-green-600"
        style={{ opacity: useTransform(x, [50, 200], [0, 1]) }}
      >
        <FaHeart className="inline mr-2" />
        LIKE
      </motion.div>
    </motion.div>
  );
}
