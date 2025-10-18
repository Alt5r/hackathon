import { Request, Response } from 'express';
import { NewsService } from '../services/newsService';

class NewsController {
  private newsService: NewsService;

  constructor() {
    this.newsService = new NewsService();
  }

  /**
   * Fetch news from all configured sources
   */
  public async getAllNews(req: Request, res: Response): Promise<void> {
    try {
      const newsArticles = await this.newsService.fetchAllNews();
      res.status(200).json({
        success: true,
        count: newsArticles.length,
        data: newsArticles
      });
    } catch (error: any) {
      console.error('Error fetching news:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error fetching news articles', 
        error: error.message 
      });
    }
  }

  /**
   * Fetch news from a specific source by index
   */
  public async getNewsBySource(req: Request, res: Response): Promise<void> {
    try {
      const index = parseInt(req.params.index);
      const newsArticle = await this.newsService.fetchNewsBySource(index);
      
      if (!newsArticle) {
        res.status(404).json({
          success: false,
          message: 'News source not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: newsArticle
      });
    } catch (error: any) {
      console.error('Error fetching news by source:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error fetching news from source', 
        error: error.message 
      });
    }
  }

  /**
   * Get all configured news source links
   */
  public async getNewsLinks(req: Request, res: Response): Promise<void> {
    try {
      const links = await this.newsService.getNewsLinks();
      res.status(200).json({
        success: true,
        count: links.length,
        data: links
      });
    } catch (error: any) {
      console.error('Error fetching news links:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error fetching news links', 
        error: error.message 
      });
    }
  }

  /**
   * Fetch news by category
   */
  public async getNewsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;
      const validCategories = ['market_data', 'news', 'analysis'];
      
      if (!validCategories.includes(category)) {
        res.status(400).json({
          success: false,
          message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
        });
        return;
      }

      const newsArticles = await this.newsService.fetchNewsByCategory(category);
      res.status(200).json({
        success: true,
        category,
        count: newsArticles.length,
        data: newsArticles
      });
    } catch (error: any) {
      console.error('Error fetching news by category:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error fetching news by category', 
        error: error.message 
      });
    }
  }

  /**
   * Fetch only high-priority news
   */
  public async getHighPriorityNews(req: Request, res: Response): Promise<void> {
    try {
      const newsArticles = await this.newsService.fetchHighPriorityNews();
      res.status(200).json({
        success: true,
        priority: 'high',
        count: newsArticles.length,
        data: newsArticles
      });
    } catch (error: any) {
      console.error('Error fetching high-priority news:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error fetching high-priority news', 
        error: error.message 
      });
    }
  }

  /**
   * Get source statistics
   */
  public async getSourceStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.newsService.getSourceStats();
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error: any) {
      console.error('Error fetching source stats:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error fetching source statistics', 
        error: error.message 
      });
    }
  }
}

export default NewsController;