import { create } from 'zustand';

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  repository_url: string;
  labels: Array<{ name: string; color: string }>;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  comments: number;
  repo_name?: string;
  language?: string;
}

interface IssueStore {
  issues: GitHubIssue[];
  currentIndex: number;
  likedIssues: GitHubIssue[];
  passedIssues: GitHubIssue[];
  isLoading: boolean;
  showGoodFirstLove: boolean;
  currentPage: number;
  hasMore: boolean;

  setIssues: (issues: GitHubIssue[]) => void;
  addIssues: (issues: GitHubIssue[]) => void;
  likeIssue: (issue: GitHubIssue) => void;
  passIssue: (issue: GitHubIssue) => void;
  nextIssue: () => void;
  setLoading: (loading: boolean) => void;
  toggleGoodFirstLove: () => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  reset: () => void;
}

export const useIssueStore = create<IssueStore>((set) => ({
  issues: [],
  currentIndex: 0,
  likedIssues: [],
  passedIssues: [],
  isLoading: false,
  showGoodFirstLove: false,
  currentPage: 1,
  hasMore: true,

  setIssues: (issues) => set({ issues, currentIndex: 0, currentPage: 1 }),

  addIssues: (issues) => set((state) => ({
    issues: [...state.issues, ...issues],
  })),

  likeIssue: (issue) => set((state) => ({
    likedIssues: [...state.likedIssues, issue],
  })),

  passIssue: (issue) => set((state) => ({
    passedIssues: [...state.passedIssues, issue],
  })),

  nextIssue: () => set((state) => ({
    currentIndex: state.currentIndex + 1,
  })),

  setLoading: (loading) => set({ isLoading: loading }),

  toggleGoodFirstLove: () => set((state) => ({
    showGoodFirstLove: !state.showGoodFirstLove,
  })),

  setPage: (page) => set({ currentPage: page }),

  setHasMore: (hasMore) => set({ hasMore }),

  reset: () => set({
    currentIndex: 0,
    likedIssues: [],
    passedIssues: [],
    currentPage: 1,
    hasMore: true,
  }),
}));
