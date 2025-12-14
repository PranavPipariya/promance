'use client';

import { GitHubIssue } from '@/lib/store';
import { FaTimes, FaExternalLinkAlt, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface LikedIssuesModalProps {
  isOpen: boolean;
  onClose: () => void;
  issues: GitHubIssue[];
}

export default function LikedIssuesModal({
  isOpen,
  onClose,
  issues,
}: LikedIssuesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaHeart className="text-2xl" />
                <h2 className="text-2xl font-bold">Your Matches</h2>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {issues.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(80vh - 100px)' }}>
              {issues.length === 0 ? (
                <div className="text-center py-12">
                  <FaHeart className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No matches yet. Start swiping!
                  </p>
                </div>
              ) : (
                issues.map((issue) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={issue.user.avatar_url}
                            alt={issue.user.login}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {issue.repo_name}
                          </span>
                        </div>

                        <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                          {issue.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {issue.labels.slice(0, 3).map((label) => (
                            <span
                              key={label.name}
                              className="px-2 py-1 rounded-md text-xs font-medium"
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
                      </div>

                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        Open Issue
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
