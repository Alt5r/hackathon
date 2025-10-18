import { NewsService } from '../src/services/newsService';
import { makeGetRequest } from '../src/utils/httpClient';
import newsLinks from '../src/data/newsLinks.json';

jest.mock('../src/utils/httpClient');

describe('NewsService', () => {
  let newsService: NewsService;

  beforeEach(() => {
    newsService = new NewsService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch news articles from all links', async () => {
    const mockResponse = { data: [{ title: 'Test Article' }] };
    (makeGetRequest as jest.Mock).mockResolvedValue(mockResponse);

    const articles = await newsService.fetchNewsArticles();

    expect(makeGetRequest).toHaveBeenCalledTimes(newsLinks.length);
    newsLinks.forEach(link => {
      expect(makeGetRequest).toHaveBeenCalledWith(link);
    });
    expect(articles).toEqual([mockResponse.data]);
  });

  it('should handle errors when fetching news articles', async () => {
    (makeGetRequest as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(newsService.fetchNewsArticles()).rejects.toThrow('Network Error');
  });
});