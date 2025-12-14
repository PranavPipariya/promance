'use client';

import { FaHeart, FaTimes, FaGithub } from 'react-icons/fa';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onViewLiked: () => void;
  likedCount: number;
}

export default function ActionButtons({
  onPass,
  onLike,
  onViewLiked,
  likedCount,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button
        onClick={onPass}
        className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95"
        aria-label="Pass"
      >
        <FaTimes className="text-3xl" />
      </button>

      <button
        onClick={onViewLiked}
        className="bg-purple-500 hover:bg-purple-600 text-white p-5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95 relative"
        aria-label="View liked issues"
      >
        <FaGithub className="text-2xl" />
        {likedCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {likedCount}
          </span>
        )}
      </button>

      <button
        onClick={onLike}
        className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95"
        aria-label="Like"
      >
        <FaHeart className="text-3xl" />
      </button>
    </div>
  );
}
