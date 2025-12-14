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
    const page = parseInt(searchParams.get('page') || '1');

    // Fetch multiple pages for endless feed
    const allIssues: any[] = [];
    const pagesToFetch = 3; // Fetch 3 pages = 90 issues

    for (let currentPage = page; currentPage < page + pagesToFetch; currentPage++) {
      let query = 'is:open is:issue ';

      if (goodFirstOnly) {
        query += 'label:"good first issue" ';
      }

      if (language) {
        query += `language:${language} `;
      }

      // Add filters for quality issues
      query += 'no:assignee';

      try {
        const { data } = await octokit.search.issuesAndPullRequests({
          q: query,
          sort: 'created',
          order: 'desc',
          per_page: 100, // Max per page
          page: currentPage,
        });

        allIssues.push(...data.items);

        // If we got fewer than 100, we're at the end
        if (data.items.length < 100) {
          break;
        }
      } catch (err) {
        console.error(`Error fetching page ${currentPage}:`, err);
        // Continue with what we have
        break;
      }
    }

    // Enrich issues with repo name
    const enrichedIssues = allIssues.map((issue) => {
      const repoUrl = issue.repository_url;
      const repoName = repoUrl.split('/').slice(-2).join('/');

      return {
        id: issue.id,
        number: issue.number,
        title: issue.title,
        body: issue.body,
        html_url: issue.html_url,
        repository_url: issue.repository_url,
        labels: issue.labels.map((label: any) =>
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

    return NextResponse.json({
      issues: enrichedIssues,
      hasMore: allIssues.length >= 100, // Indicate if more pages available
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}
