#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const server = new Server(
  {
    name: 'promance-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'find_issues',
        description: 'Find GitHub issues based on programming language and optional filters like good-first-issue',
        inputSchema: {
          type: 'object',
          properties: {
            language: {
              type: 'string',
              description: 'Programming language (e.g., javascript, python, rust)',
            },
            goodFirstOnly: {
              type: 'boolean',
              description: 'Filter for good-first-issue labels only',
              default: false,
            },
            limit: {
              type: 'number',
              description: 'Number of issues to return (default: 10)',
              default: 10,
            },
          },
        },
      },
      {
        name: 'get_issue_details',
        description: 'Get detailed information about a specific GitHub issue',
        inputSchema: {
          type: 'object',
          properties: {
            owner: {
              type: 'string',
              description: 'Repository owner',
            },
            repo: {
              type: 'string',
              description: 'Repository name',
            },
            issue_number: {
              type: 'number',
              description: 'Issue number',
            },
          },
          required: ['owner', 'repo', 'issue_number'],
        },
      },
      {
        name: 'search_beginner_issues',
        description: 'Find beginner-friendly issues (GoodFirstLove) across all repositories',
        inputSchema: {
          type: 'object',
          properties: {
            language: {
              type: 'string',
              description: 'Programming language filter (optional)',
            },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'find_issues': {
        const { language = '', goodFirstOnly = false, limit = 10 } = args as {
          language?: string;
          goodFirstOnly?: boolean;
          limit?: number;
        };

        let query = 'is:open is:issue ';

        if (goodFirstOnly) {
          query += 'label:"good first issue" ';
        }

        if (language) {
          query += `language:${language} `;
        }

        query += 'no:assignee comments:>0';

        const { data } = await octokit.search.issuesAndPullRequests({
          q: query,
          sort: 'created',
          order: 'desc',
          per_page: limit,
        });

        const issues = data.items.map((issue) => {
          const repoUrl = issue.repository_url;
          const repoName = repoUrl.split('/').slice(-2).join('/');

          return {
            number: issue.number,
            title: issue.title,
            url: issue.html_url,
            repo: repoName,
            labels: issue.labels
              .map((label) => (typeof label === 'string' ? label : label.name))
              .filter(Boolean),
            created_at: issue.created_at,
            comments: issue.comments,
          };
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ total: data.total_count, issues }, null, 2),
            },
          ],
        };
      }

      case 'get_issue_details': {
        const { owner, repo, issue_number } = args as {
          owner: string;
          repo: string;
          issue_number: number;
        };

        const { data: issue } = await octokit.issues.get({
          owner,
          repo,
          issue_number,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  number: issue.number,
                  title: issue.title,
                  body: issue.body,
                  state: issue.state,
                  url: issue.html_url,
                  created_at: issue.created_at,
                  updated_at: issue.updated_at,
                  comments: issue.comments,
                  labels: issue.labels.map((label) => label.name),
                  assignee: issue.assignee?.login,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case 'search_beginner_issues': {
        const { language = '' } = args as { language?: string };

        let query = 'is:open is:issue label:"good first issue" no:assignee ';

        if (language) {
          query += `language:${language} `;
        }

        const { data } = await octokit.search.issuesAndPullRequests({
          q: query,
          sort: 'created',
          order: 'desc',
          per_page: 15,
        });

        const issues = data.items.map((issue) => {
          const repoUrl = issue.repository_url;
          const repoName = repoUrl.split('/').slice(-2).join('/');

          return {
            title: issue.title,
            repo: repoName,
            url: issue.html_url,
            labels: issue.labels
              .map((label) => (typeof label === 'string' ? label : label.name))
              .filter(Boolean),
          };
        });

        return {
          content: [
            {
              type: 'text',
              text: `Found ${data.total_count} beginner-friendly issues!\n\n${JSON.stringify(issues, null, 2)}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('PRomance MCP Server running on stdio');
}

main();
