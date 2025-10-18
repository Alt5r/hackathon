import { promises as fs } from 'fs';
import path from 'path';
import pLimit from 'p-limit';
import { makeGetRequest } from '../utils/httpClient';
// import parseHtmlForTrending from '../utils/trendingExtractor';
import { NewsLink, FetchedNewsData, NewsSourcesConfig, DetailedNewsSource } from '../types';

export class NewsService {
  private newsLinks: NewsLink[] = [];
  private detailedSources: Map<string, DetailedNewsSource[]> = new Map();
  private linksLoaded = false;
  private useDetailedConfig = true; // Toggle between simple and detailed config

  /**
   * Load news links from JSON file (simple format)
   */
  private async loadSimpleNewsLinks(): Promise<void> {
    try {
      const filePath = path.join(__dirname, '../data/newsLinks.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const links = JSON.parse(data);
      
      // Convert to NewsLink objects
      this.newsLinks = links.map((url: string, index: number) => ({
        id: index,
        url,
        name: this.extractDomainName(url),
        active: true,
        category: 'finance',
        priority: 'medium'
      }));
      
      console.log(`✅ Loaded ${this.newsLinks.length} financial news sources (simple config)`);
    } catch (error: any) {
      console.error('Error loading simple news links:', error);
      throw new Error(`Failed to load news links: ${error.message}`);
    }
  }

  /**
   * Load detailed news sources from JSON file (categorized format)
   */
  private async loadDetailedNewsLinks(): Promise<void> {
    try {
      const filePath = path.join(__dirname, '../data/newsSourcesDetailed.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const config: NewsSourcesConfig = JSON.parse(data);
      
      let id = 0;
      this.newsLinks = [];
      
      // Flatten the categorized structure
      for (const [groupKey, group] of Object.entries(config)) {
        this.detailedSources.set(groupKey, group.sources);
        
        for (const source of group.sources) {
          this.newsLinks.push({
            id: id++,
            url: source.url,
            name: source.name,
            active: source.active,
            category: source.category,
            priority: source.priority
          });
        }
      }
      
      console.log(`✅ Loaded ${this.newsLinks.length} financial news sources across ${Object.keys(config).length} categories`);
      console.log(`📊 Categories: ${Object.keys(config).join(', ')}`);
    } catch (error: any) {
      console.warn('⚠️  Detailed config not found, falling back to simple config');
      await this.loadSimpleNewsLinks();
    }
  }

  /**
   * Load news links based on configuration
   */
  private async loadNewsLinks(): Promise<void> {
    if (this.linksLoaded) return;

    if (this.useDetailedConfig) {
      await this.loadDetailedNewsLinks();
    } else {
      await this.loadSimpleNewsLinks();
    }
    
    this.linksLoaded = true;
  }

  /**
   * Extract domain name from URL for display
   */
  private extractDomainName(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  /**
   * Fetch news from all configured sources
   */
  public async fetchAllNews(): Promise<FetchedNewsData[]> {
    await this.loadNewsLinks();
    
    const activeLinks = this.newsLinks.filter(link => link.active);
    console.log(`📰 Fetching financial news from ${activeLinks.length} sources...`);

    const fetchPromises = activeLinks.map(async (link) => {
      try {
        const data = await makeGetRequest(link.url);
        return {
          source: link.name,
          url: link.url,
          data,
          fetchedAt: new Date().toISOString(),
          success: true,
          category: link.category,
          priority: link.priority
        } as FetchedNewsData;
      } catch (error: any) {
        console.error(`❌ Error fetching from ${link.name}:`, error.message);
        return {
          source: link.name,
          url: link.url,
          error: error.message,
          fetchedAt: new Date().toISOString(),
          success: false,
          category: link.category,
          priority: link.priority
        } as FetchedNewsData;
      }
    });

    const results = await Promise.allSettled(fetchPromises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<FetchedNewsData> => result.status === 'fulfilled')
      .map(result => result.value);
  }

  /**
   * Fetch news by category (market_data, news, analysis)
   */
  public async fetchNewsByCategory(category: string): Promise<FetchedNewsData[]> {
    await this.loadNewsLinks();
    
    const filteredLinks = this.newsLinks.filter(link => 
      link.active && link.category === category
    );
    
    console.log(`📰 Fetching ${category} news from ${filteredLinks.length} sources...`);
    
    const fetchPromises = filteredLinks.map(async (link) => {
      try {
        const data = await makeGetRequest(link.url);
        return {
          source: link.name,
          url: link.url,
          data,
          fetchedAt: new Date().toISOString(),
          success: true,
          category: link.category,
          priority: link.priority
        } as FetchedNewsData;
      } catch (error: any) {
        return {
          source: link.name,
          url: link.url,
          error: error.message,
          fetchedAt: new Date().toISOString(),
          success: false,
          category: link.category,
          priority: link.priority
        } as FetchedNewsData;
      }
    });
    
    const results = await Promise.allSettled(fetchPromises);
    
    return results
      .filter((result): result is PromiseFulfilledResult<FetchedNewsData> => result.status === 'fulfilled')
      .map(result => result.value);
  }

  /**
   * Fetch only high-priority sources
   */
  public async fetchHighPriorityNews(): Promise<FetchedNewsData[]> {
    await this.loadNewsLinks();
    
    const priorityLinks = this.newsLinks.filter(link => 
      link.active && link.priority === 'high'
    );
    
    if (priorityLinks.length === 0) {
      return [];
    }

    console.log(`📰 Fetching high-priority news from ${priorityLinks.length} sources...`);

    // Use a concurrency limiter and polite delay between requests
    const limit = pLimit(3); // max 3 concurrent requests
    const fetchPromises = priorityLinks.map((link, idx) => limit(async () => {
      // Stagger start times to be polite
      await new Promise(res => setTimeout(res, idx * 250));

      try {
        const data = await makeGetRequest(link.url);
        // Extract trending headlines and a short summary from page HTML
        // const trending = await parseHtmlForTrending(data.data, link.name);
        const trending = { titles: [], summary: 'News data fetched successfully' }; // Simplified for now

        return {
          source: link.name,
          url: link.url,
          data,
          trendingTitles: trending.titles,
          trendingSummary: trending.summary,
          fetchedAt: new Date().toISOString(),
          success: true,
          category: link.category,
          priority: link.priority
        } as FetchedNewsData;
      } catch (error: any) {
        console.error(`❌ Error fetching from ${link.name}:`, error.message);
        return {
          source: link.name,
          url: link.url,
          error: error.message,
          fetchedAt: new Date().toISOString(),
          success: false,
          category: link.category,
          priority: link.priority
        } as FetchedNewsData;
      }
    }));

    const results = await Promise.allSettled(fetchPromises);
    return results
      .filter((result): result is PromiseFulfilledResult<FetchedNewsData> => result.status === 'fulfilled')
      .map(result => result.value);
  }

  /**
   * Fetch news from a specific source by index
   */
  public async fetchNewsBySource(index: number): Promise<FetchedNewsData | null> {
    await this.loadNewsLinks();

    if (index < 0 || index >= this.newsLinks.length) {
      return null;
    }

    const link = this.newsLinks[index];
    
    if (!link.active) {
      throw new Error('News source is not active');
    }

    try {
      const data = await makeGetRequest(link.url);
      return {
        source: link.name,
        url: link.url,
        data,
        fetchedAt: new Date().toISOString(),
        success: true,
        category: link.category,
        priority: link.priority
      };
    } catch (error: any) {
      return {
        source: link.name,
        url: link.url,
        error: error.message,
        fetchedAt: new Date().toISOString(),
        success: false,
        category: link.category,
        priority: link.priority
      };
    }
  }

  /**
   * Get all configured news links
   */
  public async getNewsLinks(): Promise<NewsLink[]> {
    await this.loadNewsLinks();
    return this.newsLinks;
  }

  /**
   * Get source categories and counts
   */
  public async getSourceStats(): Promise<{
    total: number;
    active: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    await this.loadNewsLinks();
    
    const stats = {
      total: this.newsLinks.length,
      active: this.newsLinks.filter(l => l.active).length,
      byCategory: {} as Record<string, number>,
      byPriority: {} as Record<string, number>
    };
    
    this.newsLinks.forEach(link => {
      // Count by category
      if (link.category) {
        stats.byCategory[link.category] = (stats.byCategory[link.category] || 0) + 1;
      }
      
      // Count by priority
      if (link.priority) {
        stats.byPriority[link.priority] = (stats.byPriority[link.priority] || 0) + 1;
      }
    });
    
    return stats;
  }
}