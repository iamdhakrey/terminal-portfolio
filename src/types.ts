export interface CommandOutputType {
    type: 'command' | 'output';
    text: string[];
}

export interface GitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    primaryLanguages?: string[];
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    topics: Array<{ name: string }> | null;
    license: {
        key: string;
        name: string;
    } | null;
}

export default interface GitHubData {
    lastUpdated: string;
    user: {
        login: string;
        name: string;
        bio: string;
        public_repos: number;
        followers: number;
        following: number;
        avatar_url: string;
    };
    repositories: any[];
    stats: {
        totalRepos: number;
        totalStars: number;
        totalForks: number;
        languages: string[];
        allLanguages: string[];
    };
    featured: GitHubRepo[];
    byLanguage: Record<string, GitHubRepo[]>;
}