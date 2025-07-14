// Simple analytics utility for tracking visitors
export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  dailyVisits: number;
  lastVisit: string;
  currentSession: string;
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private storageKey = 'portfolio_analytics';

  private constructor() {}

  public static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  private getStats(): VisitorStats {
    const stored = localStorage.getItem(this.storageKey);
    const defaultStats: VisitorStats = {
      totalVisits: 0,
      uniqueVisitors: 0,
      dailyVisits: 0,
      lastVisit: '',
      currentSession: this.generateSessionId()
    };

    if (!stored) {
      return defaultStats;
    }

    try {
      return { ...defaultStats, ...JSON.parse(stored) };
    } catch {
      return defaultStats;
    }
  }

  private saveStats(stats: VisitorStats): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(stats));
    } catch (error) {
      console.warn('Failed to save analytics data:', error);
    }
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private isNewDay(lastVisit: string): boolean {
    if (!lastVisit) return true;
    const lastDate = new Date(lastVisit).toDateString();
    const today = new Date().toDateString();
    return lastDate !== today;
  }

  private isNewVisitor(): boolean {
    return !localStorage.getItem(this.storageKey);
  }

  public trackVisit(): VisitorStats {
    const stats = this.getStats();
    const now = new Date().toISOString();
    const isNewVisitor = this.isNewVisitor();
    const isNewDay = this.isNewDay(stats.lastVisit);

    const updatedStats: VisitorStats = {
      ...stats,
      totalVisits: stats.totalVisits + 1,
      uniqueVisitors: isNewVisitor ? stats.uniqueVisitors + 1 : stats.uniqueVisitors,
      dailyVisits: isNewDay ? 1 : stats.dailyVisits + 1,
      lastVisit: now,
      currentSession: stats.currentSession || this.generateSessionId()
    };

    this.saveStats(updatedStats);
    return updatedStats;
  }

  public getVisitorStats(): VisitorStats {
    return this.getStats();
  }

  public getFormattedStats(): string[] {
    const stats = this.getStats();
    return [
      `📊 Visitor Analytics:`,
      `═══════════════════════════════════════`,
      `👥 Total Visits: ${stats.totalVisits}`,
      `🆕 Unique Visitors: ${stats.uniqueVisitors}`,
      `📅 Today's Visits: ${stats.dailyVisits}`,
      `🕒 Last Visit: ${stats.lastVisit ? new Date(stats.lastVisit).toLocaleString() : 'First time!'}`,
      `🔖 Session ID: ${stats.currentSession.substring(0, 8)}...`,
      ``,
      `💡 Data stored locally in your browser`
    ];
  }
}

export const analytics = AnalyticsManager.getInstance();
