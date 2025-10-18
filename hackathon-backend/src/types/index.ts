export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
}

export interface NewsLink {
  id: number;
  url: string;
  name: string;
  active: boolean;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface DetailedNewsSource {
  name: string;
  url: string;
  category: 'market_data' | 'news' | 'analysis';
  priority: 'high' | 'medium' | 'low';
  active: boolean;
}

export interface NewsSourceGroup {
  name: string;
  sources: DetailedNewsSource[];
}

export interface NewsSourcesConfig {
  [key: string]: NewsSourceGroup;
}

export interface FetchedNewsData {
  source: string;
  url: string;
  data?: any;
  error?: string;
  fetchedAt: string;
  success: boolean;
  category?: string;
  priority?: string;
  trendingTitles?: string[];
  trendingSummary?: string | null;
}