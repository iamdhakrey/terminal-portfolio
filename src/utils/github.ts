import GitHubData from "../types";

export default function fetchGitHubData(): Promise<GitHubData> {
    return fetch("/github-projects.json")
        .then((res) => res.json())
        .then((data) => data as GitHubData)
        .catch(() => {
            throw new Error("Failed to fetch GitHub data");
        });
}


