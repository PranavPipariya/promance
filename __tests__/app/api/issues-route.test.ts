import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '@/app/api/issues/route';
import { NextRequest } from 'next/server';

// Mock Octokit
vi.mock('@octokit/rest', () => {
  const mockOctokit = {
    search: {
      issuesAndPullRequests: vi.fn(),
    },
  };

  return {
    Octokit: vi.fn(() => mockOctokit),
  };
});

describe('GET /api/issues', () => {
  const mockIssuesResponse = {
    data: {
      total_count: 2,
      items: [
        {
          id: 1,
          number: 123,
          title: 'Test Issue 1',
          body: 'Test body 1',
          html_url: 'https://github.com/owner/repo/issues/123',
          repository_url: 'https://api.github.com/repos/owner/repo',
          labels: [
            { name: 'good first issue', color: '7057ff' },
            { name: 'bug', color: 'd73a4a' },
          ],
          user: {
            login: 'testuser1',
            avatar_url: 'https://avatars.githubusercontent.com/u/1',
          },
          created_at: '2024-01-01T00:00:00Z',
          comments: 3,
        },
        {
          id: 2,
          number: 456,
          title: 'Test Issue 2',
          body: null,
          html_url: 'https://github.com/owner2/repo2/issues/456',
          repository_url: 'https://api.github.com/repos/owner2/repo2',
          labels: ['enhancement'], // String label format
          user: {
            login: 'testuser2',
            avatar_url: 'https://avatars.githubusercontent.com/u/2',
          },
          created_at: '2024-01-02T00:00:00Z',
          comments: 0,
        },
      ],
    },
  };

  let mockSearch: any;

  beforeEach(async () => {
    const { Octokit } = await import('@octokit/rest');
    const octokitInstance = new Octokit();
    mockSearch = octokitInstance.search.issuesAndPullRequests;
    mockSearch.mockResolvedValue(mockIssuesResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Query Parameter Handling', () => {
    it('should fetch issues without language or goodFirstOnly filter', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(mockSearch).toHaveBeenCalledWith({
        q: 'is:open is:issue no:assignee comments:>0',
        sort: 'created',
        order: 'desc',
        per_page: 30,
      });

      expect(data.issues).toHaveLength(2);
    });

    it('should include language in query when provided', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/issues?language=typescript'
      );

      await GET(request);

      expect(mockSearch).toHaveBeenCalledWith({
        q: 'is:open is:issue language:typescript no:assignee comments:>0',
        sort: 'created',
        order: 'desc',
        per_page: 30,
      });
    });

    it('should include good first issue label when goodFirstOnly is true', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/issues?goodFirstOnly=true'
      );

      await GET(request);

      expect(mockSearch).toHaveBeenCalledWith({
        q: 'is:open is:issue label:"good first issue" no:assignee comments:>0',
        sort: 'created',
        order: 'desc',
        per_page: 30,
      });
    });

    it('should combine language and goodFirstOnly filters', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/issues?language=python&goodFirstOnly=true'
      );

      await GET(request);

      expect(mockSearch).toHaveBeenCalledWith({
        q: 'is:open is:issue label:"good first issue" language:python no:assignee comments:>0',
        sort: 'created',
        order: 'desc',
        per_page: 30,
      });
    });

    it('should ignore goodFirstOnly when set to false', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/issues?goodFirstOnly=false'
      );

      await GET(request);

      expect(mockSearch).toHaveBeenCalledWith({
        q: 'is:open is:issue no:assignee comments:>0',
        sort: 'created',
        order: 'desc',
        per_page: 30,
      });
    });

    it('should handle empty language parameter', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/issues?language='
      );

      await GET(request);

      expect(mockSearch).toHaveBeenCalledWith({
        q: 'is:open is:issue no:assignee comments:>0',
        sort: 'created',
        order: 'desc',
        per_page: 30,
      });
    });
  });

  describe('Response Formatting', () => {
    it('should return enriched issues with repo names', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(data.issues).toHaveLength(2);
      expect(data.issues[0].repo_name).toBe('owner/repo');
      expect(data.issues[1].repo_name).toBe('owner2/repo2');
    });

    it('should format object labels correctly', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(data.issues[0].labels).toEqual([
        { name: 'good first issue', color: '7057ff' },
        { name: 'bug', color: 'd73a4a' },
      ]);
    });

    it('should convert string labels to objects', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(data.issues[1].labels).toEqual([
        { name: 'enhancement', color: '000000' },
      ]);
    });

    it('should include all required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      const issue = data.issues[0];
      expect(issue).toHaveProperty('id');
      expect(issue).toHaveProperty('number');
      expect(issue).toHaveProperty('title');
      expect(issue).toHaveProperty('body');
      expect(issue).toHaveProperty('html_url');
      expect(issue).toHaveProperty('repository_url');
      expect(issue).toHaveProperty('labels');
      expect(issue).toHaveProperty('user');
      expect(issue).toHaveProperty('created_at');
      expect(issue).toHaveProperty('comments');
      expect(issue).toHaveProperty('repo_name');
    });

    it('should handle null body', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(data.issues[1].body).toBeNull();
    });

    it('should preserve user information', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(data.issues[0].user).toEqual({
        login: 'testuser1',
        avatar_url: 'https://avatars.githubusercontent.com/u/1',
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 500 status on API error', async () => {
      mockSearch.mockRejectedValueOnce(new Error('GitHub API Error'));

      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch issues' });
    });

    it('should log error on failure', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockSearch.mockRejectedValueOnce(new Error('Network Error'));

      const request = new NextRequest('http://localhost:3000/api/issues');

      await GET(request);

      expect(consoleError).toHaveBeenCalledWith(
        'Error fetching issues:',
        expect.any(Error)
      );

      consoleError.mockRestore();
    });

    it('should handle empty results', async () => {
      mockSearch.mockResolvedValueOnce({
        data: {
          total_count: 0,
          items: [],
        },
      });

      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.issues).toEqual([]);
    });
  });

  describe('Edge Cases', () => {
    it('should handle issues with missing label properties', async () => {
      mockSearch.mockResolvedValueOnce({
        data: {
          items: [
            {
              ...mockIssuesResponse.data.items[0],
              labels: [{ name: '', color: '' }],
            },
          ],
        },
      });

      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(data.issues[0].labels[0]).toEqual({ name: '', color: '' });
    });

    it('should handle malformed repository URLs', async () => {
      mockSearch.mockResolvedValueOnce({
        data: {
          items: [
            {
              ...mockIssuesResponse.data.items[0],
              repository_url: 'invalid-url',
            },
          ],
        },
      });

      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      // Should still work but might have unexpected repo_name
      expect(data.issues[0].repo_name).toBeDefined();
    });

    it('should handle missing user data', async () => {
      mockSearch.mockResolvedValueOnce({
        data: {
          items: [
            {
              ...mockIssuesResponse.data.items[0],
              user: null,
            },
          ],
        },
      });

      const request = new NextRequest('http://localhost:3000/api/issues');

      const response = await GET(request);
      const data = await response.json();

      expect(data.issues[0].user).toEqual({
        login: 'unknown',
        avatar_url: '',
      });
    });
  });

  describe('Query Building Logic', () => {
    it('should always include base filters', async () => {
      const request = new NextRequest('http://localhost:3000/api/issues');

      await GET(request);

      const call = mockSearch.mock.calls[0][0];
      expect(call.q).toContain('is:open');
      expect(call.q).toContain('is:issue');
      expect(call.q).toContain('no:assignee');
      expect(call.q).toContain('comments:>0');
    });

    it('should maintain query order', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/issues?goodFirstOnly=true&language=rust'
      );

      await GET(request);

      const call = mockSearch.mock.calls[0][0];
      const query = call.q;

      const openIndex = query.indexOf('is:open');
      const labelIndex = query.indexOf('label:');
      const langIndex = query.indexOf('language:');
      const assigneeIndex = query.indexOf('no:assignee');

      expect(openIndex).toBeLessThan(labelIndex);
      expect(labelIndex).toBeLessThan(langIndex);
      expect(langIndex).toBeLessThan(assigneeIndex);
    });
  });
});