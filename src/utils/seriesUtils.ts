interface SeriesInfo {
    isInSeries: boolean;
    seriesName: string;
    seriesIndex: number;
    totalInSeries: number;
    seriesProgress: number;
    previousInSeries?: {
        slug: string;
        title: string;
    };
    nextInSeries?: {
        slug: string;
        title: string;
    };
}

// Linux series order based on learning progression
const LINUX_SERIES_ORDER = [
    'linux-beginner-introduction.md',
    'linux-terminal-commands.md',
    'linux-file-management.md',
    'linux-filesystem-hierarchy.md',
    'linux-permissions.md',
    'linux-text-processing.md',
    'linux-package-management.md',
    'linux-user-group-management.md',
    'linux-process-management.md',
    'linux-environment-variables.md',
    'linux-cron-automation.md',
    'linux-system-logs-analysis.md',
    'linux-network-configuration-troubleshooting.md',
    'linux-ssh-mastery-secure-remote-access.md'
];

export function getSeriesInfo(currentSlug: string, allBlogs: Array<{ slug: string; title: string; date: string }>): SeriesInfo {
    // Check if current blog is part of Linux series
    const currentFilename = `${currentSlug}.md`;
    const seriesIndex = LINUX_SERIES_ORDER.indexOf(currentFilename);

    if (seriesIndex === -1) {
        return {
            isInSeries: false,
            seriesName: '',
            seriesIndex: 0,
            totalInSeries: 0,
            seriesProgress: 0
        };
    }

    // Find all available blogs in the series
    const availableSeriesBlogs = LINUX_SERIES_ORDER.filter(filename =>
        allBlogs.some(blog => `${blog.slug}.md` === filename)
    );

    const currentIndexInAvailable = availableSeriesBlogs.indexOf(currentFilename);
    const totalAvailable = availableSeriesBlogs.length;

    // Get previous and next in series
    let previousInSeries: SeriesInfo['previousInSeries'];
    let nextInSeries: SeriesInfo['nextInSeries'];

    if (currentIndexInAvailable > 0) {
        const prevFilename = availableSeriesBlogs[currentIndexInAvailable - 1];
        const prevBlog = allBlogs.find(blog => `${blog.slug}.md` === prevFilename);
        if (prevBlog) {
            previousInSeries = {
                slug: prevBlog.slug,
                title: prevBlog.title
            };
        }
    }

    if (currentIndexInAvailable < totalAvailable - 1) {
        const nextFilename = availableSeriesBlogs[currentIndexInAvailable + 1];
        const nextBlog = allBlogs.find(blog => `${blog.slug}.md` === nextFilename);
        if (nextBlog) {
            nextInSeries = {
                slug: nextBlog.slug,
                title: nextBlog.title
            };
        }
    }

    return {
        isInSeries: true,
        seriesName: 'Linux Mastery Series',
        seriesIndex: currentIndexInAvailable + 1,
        totalInSeries: totalAvailable,
        seriesProgress: Math.round(((currentIndexInAvailable + 1) / totalAvailable) * 100),
        previousInSeries,
        nextInSeries
    };
}

export function getAllSeriesBlogs(): string[] {
    return LINUX_SERIES_ORDER.map(filename => filename.replace('.md', ''));
}
