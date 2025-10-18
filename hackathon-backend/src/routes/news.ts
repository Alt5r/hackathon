import { Router } from 'express';
import NewsController from '../controllers/newsController';

const router = Router();
const newsController = new NewsController();

// GET all news sources
router.get('/', newsController.getAllNews.bind(newsController));

// GET news from a specific source by index
router.get('/source/:index', newsController.getNewsBySource.bind(newsController));

// GET news by category (market_data, news, analysis)
router.get('/category/:category', newsController.getNewsByCategory.bind(newsController));

// GET only high-priority news sources
router.get('/priority/high', newsController.getHighPriorityNews.bind(newsController));

// GET all configured news links
router.get('/links', newsController.getNewsLinks.bind(newsController));

// GET statistics about news sources
router.get('/stats', newsController.getSourceStats.bind(newsController));

export default router;