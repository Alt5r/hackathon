/**
 * API Service for connecting to the TruthCapital Backend
 */

// @ts-ignore - Vite env types
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001';

console.log('='.repeat(60));
console.log('🔗 NewsAPI Backend URL:', API_BASE_URL);
console.log('📍 This should be: http://192.168.0.85:3001 (for LAN access)');
console.log('='.repeat(60));

export interface NewsLink {
  id: number;
  url: string;
  name: string;
  active: boolean;
}

export interface FetchedNewsData {
  source: string;
  url: string;
  data?: any;
  error?: string;
  fetchedAt: string;
  success: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data?: T;
  message?: string;
  error?: string;
}

class NewsApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if the backend server is healthy
   */
  async checkHealth(): Promise<{ status: string; message: string }> {
    try {
      console.log('🏥 Checking backend health at:', `${this.baseUrl}/health`);
      const response = await fetch(`${this.baseUrl}/health`, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Backend health check successful:', data);
      return data;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      throw new Error(`Backend server is not responding: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get all configured news source links
   */
  async getNewsLinks(): Promise<NewsLink[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/news/links`);
      const result: ApiResponse<NewsLink[]> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to fetch news links');
    } catch (error) {
      console.error('Error fetching news links:', error);
      throw error;
    }
  }

  /**
   * Fetch news from all configured sources
   */
  async fetchAllNews(): Promise<FetchedNewsData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/news`);
      const result: ApiResponse<FetchedNewsData[]> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to fetch news');
    } catch (error) {
      console.error('Error fetching all news:', error);
      throw error;
    }
  }

  /**
   * Fetch news from a specific source by index
   */
  async fetchNewsBySource(sourceIndex: number): Promise<FetchedNewsData> {
    try {
      const response = await fetch(`${this.baseUrl}/api/news/source/${sourceIndex}`);
      const result: ApiResponse<FetchedNewsData> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      throw new Error(result.message || 'Failed to fetch news from source');
    } catch (error) {
      console.error(`Error fetching news from source ${sourceIndex}:`, error);
      throw error;
    }
  }
}

// Export a singleton instance
export const newsApi = new NewsApiService();

// Export the class for custom instances
export default NewsApiService;
