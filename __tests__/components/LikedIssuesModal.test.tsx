import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LikedIssuesModal from '@/components/LikedIssuesModal';
import type { GitHubIssue } from '@/lib/store';

describe('LikedIssuesModal', () => {
  const mockOnClose = vi.fn();

  const mockIssues: GitHubIssue[] = [
    {
      id: 1,
      number: 123,
      title: 'First Test Issue',
      body: 'Test body 1',
      html_url: 'https://github.com/owner/repo1/issues/123',
      repository_url: 'https://api.github.com/repos/owner/repo1',
      labels: [{ name: 'bug', color: 'd73a4a' }],
      user: {
        login: 'user1',
        avatar_url: 'https://avatars.githubusercontent.com/u/1',
      },
      created_at: '2024-01-01T00:00:00Z',
      comments: 3,
      repo_name: 'owner/repo1',
    },
    {
      id: 2,
      number: 456,
      title: 'Second Test Issue',
      body: 'Test body 2',
      html_url: 'https://github.com/owner/repo2/issues/456',
      repository_url: 'https://api.github.com/repos/owner/repo2',
      labels: [
        { name: 'enhancement', color: 'a2eeef' },
        { name: 'good first issue', color: '7057ff' },
      ],
      user: {
        login: 'user2',
        avatar_url: 'https://avatars.githubusercontent.com/u/2',
      },
      created_at: '2024-01-02T00:00:00Z',
      comments: 5,
      repo_name: 'owner/repo2',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Modal Visibility', () => {
    it('should not render when isOpen is false', () => {
      render(
        <LikedIssuesModal
          isOpen={false}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      expect(screen.queryByText('Your Matches')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      expect(screen.getByText('Your Matches')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no issues', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={[]}
        />
      );

      expect(screen.getByText('No matches yet. Start swiping!')).toBeInTheDocument();
    });

    it('should show count of 0 in badge for empty issues', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={[]}
        />
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Issue List', () => {
    it('should render all issues', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      expect(screen.getByText('First Test Issue')).toBeInTheDocument();
      expect(screen.getByText('Second Test Issue')).toBeInTheDocument();
    });

    it('should show correct issue count in badge', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should render repository names', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      expect(screen.getByText('owner/repo1')).toBeInTheDocument();
      expect(screen.getByText('owner/repo2')).toBeInTheDocument();
    });

    it('should render issue labels (max 3)', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      expect(screen.getByText('bug')).toBeInTheDocument();
      expect(screen.getByText('enhancement')).toBeInTheDocument();
      expect(screen.getByText('good first issue')).toBeInTheDocument();
    });

    it('should limit labels to 3 per issue', () => {
      const manyLabelsIssue: GitHubIssue = {
        ...mockIssues[0],
        labels: [
          { name: 'label1', color: '000000' },
          { name: 'label2', color: '111111' },
          { name: 'label3', color: '222222' },
          { name: 'label4', color: '333333' },
        ],
      };

      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={[manyLabelsIssue]}
        />
      );

      expect(screen.getByText('label1')).toBeInTheDocument();
      expect(screen.getByText('label2')).toBeInTheDocument();
      expect(screen.getByText('label3')).toBeInTheDocument();
      expect(screen.queryByText('label4')).not.toBeInTheDocument();
    });

    it('should render user avatars', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      const avatar1 = screen.getByAltText('user1');
      const avatar2 = screen.getByAltText('user2');

      expect(avatar1).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/1');
      expect(avatar2).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/2');
    });
  });

  describe('Links', () => {
    it('should have correct GitHub links', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      const links = screen.getAllByText('Open Issue');
      expect(links[0].closest('a')).toHaveAttribute(
        'href',
        'https://github.com/owner/repo1/issues/123'
      );
      expect(links[1].closest('a')).toHaveAttribute(
        'href',
        'https://github.com/owner/repo2/issues/456'
      );
    });

    it('should open links in new tab', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      const links = screen.getAllByText('Open Issue');
      links.forEach((link) => {
        expect(link.closest('a')).toHaveAttribute('target', '_blank');
        expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Close Functionality', () => {
    it('should call onClose when close button is clicked', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      const closeButton = screen.getByRole('button', { name: '' }); // X button
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', () => {
      const { container } = render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      const backdrop = container.querySelector('.fixed.inset-0');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(mockOnClose).toHaveBeenCalled();
      }
    });

    it('should not call onClose when modal content is clicked', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={mockIssues}
        />
      );

      const modalContent = screen.getByText('Your Matches').closest('div');
      if (modalContent) {
        fireEvent.click(modalContent);
        expect(mockOnClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle single issue', () => {
      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={[mockIssues[0]]}
        />
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('First Test Issue')).toBeInTheDocument();
    });

    it('should handle many issues', () => {
      const manyIssues = Array.from({ length: 20 }, (_, i) => ({
        ...mockIssues[0],
        id: i,
        title: `Issue ${i}`,
      }));

      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={manyIssues}
        />
      );

      expect(screen.getByText('20')).toBeInTheDocument();
    });

    it('should handle issues with no labels', () => {
      const noLabelsIssue: GitHubIssue = {
        ...mockIssues[0],
        labels: [],
      };

      render(
        <LikedIssuesModal
          isOpen={true}
          onClose={mockOnClose}
          issues={[noLabelsIssue]}
        />
      );

      expect(screen.getByText('First Test Issue')).toBeInTheDocument();
    });
  });
});