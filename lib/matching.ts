import { GitHubIssue } from './store';
import { UserProfile } from './userStore';

// Smart matching algorithm
export function calculateMatchScore(issue: GitHubIssue, user: UserProfile): number {
  let score = 0;

  // Language match (40 points)
  if (issue.language && user.languages.includes(issue.language)) {
    score += 40;
  }

  // Experience level match (30 points)
  const isGoodFirstIssue = issue.labels.some(label =>
    label.name.toLowerCase().includes('good first') ||
    label.name.toLowerCase().includes('beginner')
  );

  if (user.experienceLevel === 'beginner' && isGoodFirstIssue) {
    score += 30;
  } else if (user.experienceLevel === 'intermediate' && !isGoodFirstIssue) {
    score += 20;
  } else if (user.experienceLevel === 'advanced' && !isGoodFirstIssue) {
    score += 25;
  }

  // Issue type match (20 points)
  const issueTypeMatches = user.issueTypes.some(type => {
    const typeLower = type.toLowerCase();
    const labels = issue.labels.map(l => l.name.toLowerCase()).join(' ');
    const title = issue.title.toLowerCase();
    const body = (issue.body || '').toLowerCase();

    if (typeLower.includes('bug') && (labels.includes('bug') || title.includes('bug'))) return true;
    if (typeLower.includes('feature') && (labels.includes('feature') || labels.includes('enhancement'))) return true;
    if (typeLower.includes('doc') && (labels.includes('doc') || labels.includes('documentation'))) return true;
    if (typeLower.includes('test') && (labels.includes('test') || title.includes('test'))) return true;
    if (typeLower.includes('refactor') && (labels.includes('refactor') || title.includes('refactor'))) return true;

    return false;
  });

  if (issueTypeMatches) {
    score += 20;
  }

  // Interest match (10 points)
  const interestMatches = user.interests.some(interest => {
    const interestLower = interest.toLowerCase();
    const labels = issue.labels.map(l => l.name.toLowerCase()).join(' ');
    const title = issue.title.toLowerCase();
    const repo = (issue.repo_name || '').toLowerCase();

    return labels.includes(interestLower) || title.includes(interestLower) || repo.includes(interestLower);
  });

  if (interestMatches) {
    score += 10;
  }

  return score;
}

export function sortIssuesByMatch(issues: GitHubIssue[], user: UserProfile): GitHubIssue[] {
  return issues
    .map(issue => ({
      issue,
      score: calculateMatchScore(issue, user),
    }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.issue);
}
