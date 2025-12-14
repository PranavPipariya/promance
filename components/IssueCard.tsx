'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { GitHubIssue } from '@/lib/store';
import { FaHeart, FaTimes, FaGithub, FaComments, FaClock, FaCode } from 'react-icons/fa';
import { useState } from 'react';
import { theme } from '@/lib/theme';

interface IssueCardProps {
  issue: GitHubIssue;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  style?: React.CSSProperties;
}

export default function IssueCard({ issue, onSwipeLeft, onSwipeRight, style }: IssueCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 300 : -300);
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
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
  };

  const formatDescription = (body: string | null) => {
    if (!body) return 'No description provided.';

    // Remove markdown code blocks
    let cleaned = body.replace(/```[\s\S]*?```/g, '[code]');

    // Remove inline code
    cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

    // Remove markdown links but keep text
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    // Remove headers
    cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');

    // Remove bold/italic markers
    cleaned = cleaned.replace(/\*\*([^\*]+)\*\*/g, '$1');
    cleaned = cleaned.replace(/\*([^\*]+)\*/g, '$1');
    cleaned = cleaned.replace(/__([^_]+)__/g, '$1');
    cleaned = cleaned.replace(/_([^_]+)_/g, '$1');

    // Remove extra whitespace
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    cleaned = cleaned.trim();

    // Limit length
    if (cleaned.length > 350) {
      cleaned = cleaned.substring(0, 350) + '...';
    }

    return cleaned;
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
      <div
        className="rounded-3xl shadow-2xl h-full overflow-hidden relative"
        style={{ backgroundColor: theme.colors.bgWhite }}
      >
        {/* Header with gradient */}
        <div
          className="p-6 pb-4"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <FaGithub className="text-white text-sm flex-shrink-0" />
                <span className="text-white text-sm font-medium truncate">
                  {issue.repo_name}
                </span>
              </div>
              <h2 className="text-white text-2xl font-bold leading-tight line-clamp-2">
                {issue.title}
              </h2>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {isGoodFirstIssue && (
              <span className="bg-white/90 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <FaHeart className="text-red-500" />
                <span style={{ color: theme.colors.textPrimary }}>GoodFirstLove</span>
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <FaClock />
              {getTimeAgo(issue.created_at)}
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <FaComments />
              {issue.comments}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 280px)' }}>
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: theme.colors.textSecondary }}>
              Description
            </h3>
            <div
              className="text-base leading-loose space-y-2"
              style={{ color: theme.colors.textPrimary }}
            >
              {formatDescription(issue.body).split('\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="mb-2">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>

          {/* Labels */}
          {issue.labels.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: theme.colors.textSecondary }}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {issue.labels.slice(0, 6).map((label) => (
                  <span
                    key={label.name}
                    className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1"
                    style={{
                      backgroundColor: `#${label.color}15`,
                      color: `#${label.color}`,
                      border: `1.5px solid #${label.color}30`,
                    }}
                  >
                    <FaCode className="text-xs" />
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 border-t"
          style={{
            backgroundColor: theme.colors.bgWhite,
            borderColor: theme.colors.border,
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={issue.user.avatar_url}
              alt={issue.user.login}
              className="w-12 h-12 rounded-full ring-2 ring-yellow-400"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold" style={{ color: theme.colors.textPrimary }}>
                @{issue.user.login}
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                Issue #{issue.number}
              </div>
            </div>
          </div>
        </div>

        {/* Swipe indicators */}
        <motion.div
          className="absolute top-32 right-8 px-6 py-3 rounded-2xl font-bold text-xl border-4 rotate-12 shadow-lg"
          style={{
            backgroundColor: theme.colors.bgWhite,
            borderColor: '#EF4444',
            color: '#EF4444',
            opacity: useTransform(x, [-200, -50], [1, 0]).get(),
          }}
        >
          <FaTimes className="inline mr-2" />
          PASS
        </motion.div>

        <motion.div
          className="absolute top-32 left-8 px-6 py-3 rounded-2xl font-bold text-xl border-4 -rotate-12 shadow-lg"
          style={{
            backgroundColor: theme.colors.bgWhite,
            borderColor: theme.colors.success,
            color: theme.colors.success,
            opacity: useTransform(x, [50, 200], [0, 1]).get(),
          }}
        >
          <FaHeart className="inline mr-2" />
          MATCH
        </motion.div>
      </div>
    </motion.div>
  );
}
