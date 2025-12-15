import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButtons from '@/components/ActionButtons';

describe('ActionButtons', () => {
  const mockOnPass = vi.fn();
  const mockOnLike = vi.fn();
  const mockOnViewLiked = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all three buttons', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={0}
        />
      );

      expect(screen.getByLabelText('Pass')).toBeInTheDocument();
      expect(screen.getByLabelText('Like')).toBeInTheDocument();
      expect(screen.getByLabelText('View liked issues')).toBeInTheDocument();
    });

    it('should not show badge when likedCount is 0', () => {
      const { container } = render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={0}
        />
      );

      const badge = container.querySelector('.absolute.-top-2.-right-2');
      expect(badge).not.toBeInTheDocument();
    });

    it('should show badge with correct count when likedCount > 0', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={5}
        />
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should show badge for likedCount of 1', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={1}
        />
      );

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should show badge for large numbers', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={99}
        />
      );

      expect(screen.getByText('99')).toBeInTheDocument();
    });
  });

  describe('Click Handlers', () => {
    it('should call onPass when pass button is clicked', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={0}
        />
      );

      const passButton = screen.getByLabelText('Pass');
      fireEvent.click(passButton);

      expect(mockOnPass).toHaveBeenCalledTimes(1);
      expect(mockOnLike).not.toHaveBeenCalled();
      expect(mockOnViewLiked).not.toHaveBeenCalled();
    });

    it('should call onLike when like button is clicked', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={0}
        />
      );

      const likeButton = screen.getByLabelText('Like');
      fireEvent.click(likeButton);

      expect(mockOnLike).toHaveBeenCalledTimes(1);
      expect(mockOnPass).not.toHaveBeenCalled();
      expect(mockOnViewLiked).not.toHaveBeenCalled();
    });

    it('should call onViewLiked when view button is clicked', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={5}
        />
      );

      const viewButton = screen.getByLabelText('View liked issues');
      fireEvent.click(viewButton);

      expect(mockOnViewLiked).toHaveBeenCalledTimes(1);
      expect(mockOnPass).not.toHaveBeenCalled();
      expect(mockOnLike).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid clicks', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked=  {mockOnViewLiked}
          likedCount={0}
        />
      );

      const likeButton = screen.getByLabelText('Like');
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);

      expect(mockOnLike).toHaveBeenCalledTimes(3);
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-labels', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={0}
        />
      );

      expect(screen.getByLabelText('Pass')).toHaveAccessibleName('Pass');
      expect(screen.getByLabelText('Like')).toHaveAccessibleName('Like');
      expect(screen.getByLabelText('View liked issues')).toHaveAccessibleName(
        'View liked issues'
      );
    });

    it('should be keyboard accessible', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={0}
        />
      );

      const passButton = screen.getByLabelText('Pass');
      passButton.focus();
      expect(passButton).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('should handle likedCount of 0', () => {
      const { container } = render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={0}
        />
      );

      expect(container.querySelector('.absolute')).not.toBeInTheDocument();
    });

    it('should handle very large likedCount', () => {
      render(
        <ActionButtons
          onPass={mockOnPass}
          onLike={mockOnLike}
          onViewLiked={mockOnViewLiked}
          likedCount={999}
        />
      );

      expect(screen.getByText('999')).toBeInTheDocument();
    });
  });
});