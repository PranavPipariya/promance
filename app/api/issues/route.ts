import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const language = searchParams.get('language') || '';
    const goodFirstOnly = searchParams.get('goodFirstOnly') === 'true';

    let query = 'is:open is:issue ';

    if (goodFirstOnly) {
      query += 'label:"good first issue" ';
    }

    if (language) {
      query += `language:${language} `;
    }

    // Add filters for quality issues
    query += 'no:assignee comments:>0';

    const { data } = await octokit.search.issuesAndPullRequests({
      q: query,
      sort: 'created',
      order: 'desc',
      per_page: 30,
    });

    // Enrich issues with repo name
    const enrichedIssues = data.items.map((issue) => {
      const repoUrl = issue.repository_url;
      const repoName = repoUrl.split('/').slice(-2).join('/');

      return {
        id: issue.id,
        number: issue.number,
        title: issue.title,
        body: issue.body,
        html_url: issue.html_url,
        repository_url: issue.repository_url,
        labels: issue.labels.map((label) =>
          typeof label === 'string'
            ? { name: label, color: '000000' }
            : { name: label.name || '', color: label.color || '000000' }
        ),
        user: {
          login: issue.user?.login || 'unknown',
          avatar_url: issue.user?.avatar_url || '',
        },
        created_at: issue.created_at,
        comments: issue.comments,
        repo_name: repoName,
      };
    });

    return NextResponse.json({ issues: enrichedIssues });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}
