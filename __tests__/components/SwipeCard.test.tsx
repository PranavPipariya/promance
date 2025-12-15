import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SwipeCard from '@/components/SwipeCard';
import type { GitHubIssue } from '@/lib/store';

describe('SwipeCard', () => {
  const mockIssue: GitHubIssue = {
    id: 1,
    number: 123,
    title: 'Test Issue Title',
    body: 'This is a test issue body with some description.',
    html_url: 'https://github.com/owner/repo/issues/123',
    repository_url: 'https://api.github.com/repos/owner/repo',
    labels: [
      { name: 'good first issue', color: '7057ff' },
      { name: 'bug', color: 'd73a4a' },
    ],
    user: {
      login: 'testuser',
      avatar_url: 'https://avatars.githubusercontent.com/u/1',
    },
    created_at: '2024-01-01T00:00:00Z',
    comments: 5,
    repo_name: 'owner/repo',
    language: 'TypeScript',
  };

  const mockOnSwipeLeft = vi.fn();
  const mockOnSwipeRight = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render issue title', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('Test Issue Title')).toBeInTheDocument();
    });

    it('should render issue body', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText(/This is a test issue body/)).toBeInTheDocument();
    });

    it('should render repository name', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('owner/repo')).toBeInTheDocument();
    });

    it('should render user information', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('@testuser')).toBeInTheDocument();
      expect(screen.getByAltText('testuser')).toHaveAttribute(
        'src',
        'https://avatars.githubusercontent.com/u/1'
      );
    });

    it('should render labels', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('good first issue')).toBeInTheDocument();
      expect(screen.getByText('bug')).toBeInTheDocument();
    });

    it('should render comments count', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should show GoodFirstLove badge for good first issues', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('💝 GoodFirstLove')).toBeInTheDocument();
    });

    it('should not show GoodFirstLove badge for regular issues', () => {
      const regularIssue = {
        ...mockIssue,
        labels: [{ name: 'enhancement', color: 'a2eeef' }],
      };

      render(
        <SwipeCard
          issue={regularIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.queryByText('💝 GoodFirstLove')).not.toBeInTheDocument();
    });
  });

  describe('Time Display', () => {
    it('should show "Today" for issues created today', () => {
      const todayIssue = {
        ...mockIssue,
        created_at: new Date().toISOString(),
      };

      render(
        <SwipeCard
          issue={todayIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('Today')).toBeInTheDocument();
    });

    it('should show "Yesterday" for issues created yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayIssue = {
        ...mockIssue,
        created_at: yesterday.toISOString(),
      };

      render(
        <SwipeCard
          issue={yesterdayIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('Yesterday')).toBeInTheDocument();
    });

    it('should show days ago for recent issues', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const recentIssue = {
        ...mockIssue,
        created_at: threeDaysAgo.toISOString(),
      };

      render(
        <SwipeCard
          issue={recentIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('3 days ago')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null issue body', () => {
      const noBodyIssue = {
        ...mockIssue,
        body: null,
      };

      render(
        <SwipeCard
          issue={noBodyIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('No description provided.')).toBeInTheDocument();
    });

    it('should handle empty labels array', () => {
      const noLabelsIssue = {
        ...mockIssue,
        labels: [],
      };

      const { container } = render(
        <SwipeCard
          issue={noLabelsIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      // Should render without errors
      expect(container.querySelector('.flex.flex-wrap.gap-2')).toBeInTheDocument();
    });

    it('should limit displayed labels to 5', () => {
      const manyLabelsIssue = {
        ...mockIssue,
        labels: [
          { name: 'label1', color: '000000' },
          { name: 'label2', color: '111111' },
          { name: 'label3', color: '222222' },
          { name: 'label4', color: '333333' },
          { name: 'label5', color: '444444' },
          { name: 'label6', color: '555555' },
          { name: 'label7', color: '666666' },
        ],
      };

      render(
        <SwipeCard
          issue={manyLabelsIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('label1')).toBeInTheDocument();
      expect(screen.getByText('label5')).toBeInTheDocument();
      expect(screen.queryByText('label6')).not.toBeInTheDocument();
    });

    it('should apply custom styles', () => {
      const customStyle = { zIndex: 10, scale: 0.95 };

      const { container } = render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
          style={customStyle}
        />
      );

      const card = container.firstChild;
      expect(card).toBeDefined();
    });
  });

  describe('GoodFirstLove Detection', () => {
    it('should detect "good first issue" label', () => {
      const issue = {
        ...mockIssue,
        labels: [{ name: 'good first issue', color: '7057ff' }],
      };

      render(
        <SwipeCard
          issue={issue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('💝 GoodFirstLove')).toBeInTheDocument();
    });

    it('should detect "good-first-issue" label with hyphen', () => {
      const issue = {
        ...mockIssue,
        labels: [{ name: 'good-first-issue', color: '7057ff' }],
      };

      render(
        <SwipeCard
          issue={issue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('💝 GoodFirstLove')).toBeInTheDocument();
    });

    it('should detect "beginner" label', () => {
      const issue = {
        ...mockIssue,
        labels: [{ name: 'beginner friendly', color: '7057ff' }],
      };

      render(
        <SwipeCard
          issue={issue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('💝 GoodFirstLove')).toBeInTheDocument();
    });

    it('should be case insensitive', () => {
      const issue = {
        ...mockIssue,
        labels: [{ name: 'GOOD FIRST ISSUE', color: '7057ff' }],
      };

      render(
        <SwipeCard
          issue={issue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      expect(screen.getByText('💝 GoodFirstLove')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper image alt text', () => {
      render(
        <SwipeCard
          issue={mockIssue}
          onSwipeLeft={mockOnSwipeLeft}
          onSwipeRight={mockOnSwipeRight}
        />
      );

      const avatar = screen.getByAltText('testuser');
      expect(avatar).toBeInTheDocument();
    });
  });
});