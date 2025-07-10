import { ProfileConfig, profileConfig } from '../../profile.config';

// Singleton pattern to ensure configuration is loaded once
class ConfigManager {
  private static instance: ConfigManager;
  private config: ProfileConfig;

  private constructor() {
    this.config = profileConfig;
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public getConfig(): ProfileConfig {
    return this.config;
  }

  public getProfile() {
    return this.config.profile;
  }

  public getSocialLinks() {
    return this.config.socialLinks;
  }

  public getSkills() {
    return this.config.skills;
  }

  public getStats() {
    return this.config.stats;
  }

  public getAchievements() {
    return this.config.achievements;
  }

  public getTerminalConfig() {
    return this.config.terminal;
  }

  public getSystemInfo() {
    return this.config.systemInfo;
  }

  public getProjectsConfig() {
    return this.config.projects;
  }

  public getBlogsConfig() {
    return this.config.blogs;
  }

  public getSEOConfig() {
    return this.config.seo;
  }

  public getTheme() {
    return this.config.theme;
  }

  public getNavigation() {
    return this.config.navigation;
  }

  public getFooter() {
    return this.config.footer;
  }

  // Method to update configuration at runtime if needed
  public updateConfig(newConfig: Partial<ProfileConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}

// Export the singleton instance
export const configManager = ConfigManager.getInstance();

// Convenience export for direct access to config
export const config = configManager.getConfig();

// Helper functions for common operations
export const getProfileData = () => configManager.getProfile();
export const getSocialLinks = () => configManager.getSocialLinks();
export const getSkills = () => configManager.getSkills();
export const getStats = () => configManager.getStats();
export const getAchievements = () => configManager.getAchievements();
export const getTerminalConfig = () => configManager.getTerminalConfig();
export const getSystemInfo = () => configManager.getSystemInfo();
export const getProjectsConfig = () => configManager.getProjectsConfig();
export const getBlogsConfig = () => configManager.getBlogsConfig();
export const getSEOConfig = () => configManager.getSEOConfig();
export const getTheme = () => configManager.getTheme();
export const getNavigation = () => configManager.getNavigation();
export const getFooter = () => configManager.getFooter();

export default configManager;
