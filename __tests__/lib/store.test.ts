import { describe, it, expect, beforeEach } from 'vitest';
import { useIssueStore } from '@/lib/store';
import type { GitHubIssue } from '@/lib/store';

describe('useIssueStore', () => {
  // Mock issue data
  const mockIssue: GitHubIssue = {
    id: 1,
    number: 123,
    title: 'Test Issue',
    body: 'Test body',
    html_url: 'https://github.com/test/repo/issues/123',
    repository_url: 'https://api.github.com/repos/test/repo',
    labels: [
      { name: 'good first issue', color: '7057ff' },
      { name: 'bug', color: 'd73a4a' },
    ],
    user: {
      login: 'testuser',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
    created_at: '2024-01-01T00:00:00Z',
    comments: 5,
    repo_name: 'test/repo',
    language: 'TypeScript',
  };

  const mockIssue2: GitHubIssue = {
    ...mockIssue,
    id: 2,
    number: 456,
    title: 'Second Test Issue',
  };

  beforeEach(() => {
    // Reset store state before each test
    const { reset } = useIssueStore.getState();
    reset();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = useIssueStore.getState();

      expect(state.issues).toEqual([]);
      expect(state.currentIndex).toBe(0);
      expect(state.likedIssues).toEqual([]);
      expect(state.passedIssues).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(state.showGoodFirstLove).toBe(false);
    });
  });

  describe('setIssues', () => {
    it('should set issues and reset currentIndex', () => {
      const { setIssues } = useIssueStore.getState();

      setIssues([mockIssue, mockIssue2]);

      const state = useIssueStore.getState();
      expect(state.issues).toHaveLength(2);
      expect(state.issues[0]).toEqual(mockIssue);
      expect(state.currentIndex).toBe(0);
    });

    it('should replace existing issues', () => {
      const { setIssues, nextIssue } = useIssueStore.getState();

      setIssues([mockIssue]);
      nextIssue();
      expect(useIssueStore.getState().currentIndex).toBe(1);

      setIssues([mockIssue2]);
      const state = useIssueStore.getState();
      expect(state.issues).toHaveLength(1);
      expect(state.issues[0]).toEqual(mockIssue2);
      expect(state.currentIndex).toBe(0);
    });

    it('should handle empty array', () => {
      const { setIssues } = useIssueStore.getState();

      setIssues([mockIssue]);
      setIssues([]);

      const state = useIssueStore.getState();
      expect(state.issues).toEqual([]);
      expect(state.currentIndex).toBe(0);
    });
  });

  describe('likeIssue', () => {
    it('should add issue to likedIssues', () => {
      const { likeIssue } = useIssueStore.getState();

      likeIssue(mockIssue);

      const state = useIssueStore.getState();
      expect(state.likedIssues).toHaveLength(1);
      expect(state.likedIssues[0]).toEqual(mockIssue);
    });

    it('should append to existing liked issues', () => {
      const { likeIssue } = useIssueStore.getState();

      likeIssue(mockIssue);
      likeIssue(mockIssue2);

      const state = useIssueStore.getState();
      expect(state.likedIssues).toHaveLength(2);
      expect(state.likedIssues[0]).toEqual(mockIssue);
      expect(state.likedIssues[1]).toEqual(mockIssue2);
    });

    it('should not affect currentIndex', () => {
      const { likeIssue, nextIssue } = useIssueStore.getState();

      nextIssue();
      const indexBefore = useIssueStore.getState().currentIndex;

      likeIssue(mockIssue);

      const indexAfter = useIssueStore.getState().currentIndex;
      expect(indexAfter).toBe(indexBefore);
    });
  });

  describe('passIssue', () => {
    it('should add issue to passedIssues', () => {
      const { passIssue } = useIssueStore.getState();

      passIssue(mockIssue);

      const state = useIssueStore.getState();
      expect(state.passedIssues).toHaveLength(1);
      expect(state.passedIssues[0]).toEqual(mockIssue);
    });

    it('should append to existing passed issues', () => {
      const { passIssue } = useIssueStore.getState();

      passIssue(mockIssue);
      passIssue(mockIssue2);

      const state = useIssueStore.getState();
      expect(state.passedIssues).toHaveLength(2);
      expect(state.passedIssues[0]).toEqual(mockIssue);
      expect(state.passedIssues[1]).toEqual(mockIssue2);
    });
  });

  describe('nextIssue', () => {
    it('should increment currentIndex', () => {
      const { nextIssue } = useIssueStore.getState();

      nextIssue();

      expect(useIssueStore.getState().currentIndex).toBe(1);
    });

    it('should increment multiple times', () => {
      const { nextIssue } = useIssueStore.getState();

      nextIssue();
      nextIssue();
      nextIssue();

      expect(useIssueStore.getState().currentIndex).toBe(3);
    });

    it('should allow index to exceed issues length', () => {
      const { setIssues, nextIssue } = useIssueStore.getState();

      setIssues([mockIssue]);
      nextIssue();
      nextIssue();

      expect(useIssueStore.getState().currentIndex).toBe(2);
    });
  });

  describe('setLoading', () => {
    it('should set loading to true', () => {
      const { setLoading } = useIssueStore.getState();

      setLoading(true);

      expect(useIssueStore.getState().isLoading).toBe(true);
    });

    it('should set loading to false', () => {
      const { setLoading } = useIssueStore.getState();

      setLoading(true);
      setLoading(false);

      expect(useIssueStore.getState().isLoading).toBe(false);
    });
  });

  describe('toggleGoodFirstLove', () => {
    it('should toggle from false to true', () => {
      const { toggleGoodFirstLove } = useIssueStore.getState();

      toggleGoodFirstLove();

      expect(useIssueStore.getState().showGoodFirstLove).toBe(true);
    });

    it('should toggle from true to false', () => {
      const { toggleGoodFirstLove } = useIssueStore.getState();

      toggleGoodFirstLove();
      toggleGoodFirstLove();

      expect(useIssueStore.getState().showGoodFirstLove).toBe(false);
    });

    it('should toggle multiple times correctly', () => {
      const { toggleGoodFirstLove } = useIssueStore.getState();

      toggleGoodFirstLove(); // true
      toggleGoodFirstLove(); // false
      toggleGoodFirstLove(); // true

      expect(useIssueStore.getState().showGoodFirstLove).toBe(true);
    });
  });

  describe('reset', () => {
    it('should reset currentIndex to 0', () => {
      const { nextIssue, reset } = useIssueStore.getState();

      nextIssue();
      nextIssue();
      reset();

      expect(useIssueStore.getState().currentIndex).toBe(0);
    });

    it('should clear likedIssues', () => {
      const { likeIssue, reset } = useIssueStore.getState();

      likeIssue(mockIssue);
      likeIssue(mockIssue2);
      reset();

      expect(useIssueStore.getState().likedIssues).toEqual([]);
    });

    it('should clear passedIssues', () => {
      const { passIssue, reset } = useIssueStore.getState();

      passIssue(mockIssue);
      passIssue(mockIssue2);
      reset();

      expect(useIssueStore.getState().passedIssues).toEqual([]);
    });

    it('should not affect issues array', () => {
      const { setIssues, reset } = useIssueStore.getState();

      setIssues([mockIssue, mockIssue2]);
      reset();

      expect(useIssueStore.getState().issues).toHaveLength(2);
    });

    it('should not affect loading state', () => {
      const { setLoading, reset } = useIssueStore.getState();

      setLoading(true);
      reset();

      expect(useIssueStore.getState().isLoading).toBe(true);
    });

    it('should not affect showGoodFirstLove', () => {
      const { toggleGoodFirstLove, reset } = useIssueStore.getState();

      toggleGoodFirstLove();
      reset();

      expect(useIssueStore.getState().showGoodFirstLove).toBe(true);
    });
  });

  describe('Complex Workflows', () => {
    it('should handle complete swipe workflow', () => {
      const { setIssues, likeIssue, passIssue, nextIssue } = useIssueStore.getState();

      // Setup
      setIssues([mockIssue, mockIssue2]);

      // Like first issue and move next
      likeIssue(mockIssue);
      nextIssue();

      // Pass second issue
      passIssue(mockIssue2);

      const state = useIssueStore.getState();
      expect(state.likedIssues).toHaveLength(1);
      expect(state.passedIssues).toHaveLength(1);
      expect(state.currentIndex).toBe(1);
    });

    it('should handle multiple resets', () => {
      const { likeIssue, passIssue, reset } = useIssueStore.getState();

      likeIssue(mockIssue);
      reset();
      passIssue(mockIssue2);
      reset();

      const state = useIssueStore.getState();
      expect(state.likedIssues).toEqual([]);
      expect(state.passedIssues).toEqual([]);
      expect(state.currentIndex).toBe(0);
    });

    it('should handle edge case of swiping beyond available issues', () => {
      const { setIssues, nextIssue } = useIssueStore.getState();

      setIssues([mockIssue]);
      nextIssue();
      nextIssue();
      nextIssue();

      const state = useIssueStore.getState();
      expect(state.currentIndex).toBe(3);
      expect(state.currentIndex).toBeGreaterThan(state.issues.length);
    });
  });

  describe('Edge Cases', () => {
    it('should handle liking the same issue multiple times', () => {
      const { likeIssue } = useIssueStore.getState();

      likeIssue(mockIssue);
      likeIssue(mockIssue);
      likeIssue(mockIssue);

      const state = useIssueStore.getState();
      expect(state.likedIssues).toHaveLength(3);
    });

    it('should handle passing the same issue multiple times', () => {
      const { passIssue } = useIssueStore.getState();

      passIssue(mockIssue);
      passIssue(mockIssue);

      const state = useIssueStore.getState();
      expect(state.passedIssues).toHaveLength(2);
    });

    it('should handle issues with minimal data', () => {
      const minimalIssue: GitHubIssue = {
        id: 999,
        number: 999,
        title: 'Minimal',
        body: null,
        html_url: 'https://github.com/test/repo/issues/999',
        repository_url: 'https://api.github.com/repos/test/repo',
        labels: [],
        user: {
          login: 'user',
          avatar_url: '',
        },
        created_at: '2024-01-01T00:00:00Z',
        comments: 0,
      };

      const { likeIssue } = useIssueStore.getState();
      likeIssue(minimalIssue);

      expect(useIssueStore.getState().likedIssues[0]).toEqual(minimalIssue);
    });
  });
});