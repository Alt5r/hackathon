/**
 * Example React component showing how to integrate with the backend API
 * This can be used in your frontend App.tsx or as a separate component
 */

import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001';

interface NewsLink {
  id: number;
  url: string;
  name: string;
  active: boolean;
}

interface FetchedNewsData {
  source: string;
  url: string;
  data?: any;
  error?: string;
  fetchedAt: string;
  success: boolean;
}

export function NewsIntegrationExample() {
  const [newsLinks, setNewsLinks] = useState<NewsLink[]>([]);
  const [newsData, setNewsData] = useState<FetchedNewsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch available news sources on component mount
  useEffect(() => {
    fetchNewsLinks();
  }, []);

  const fetchNewsLinks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/news/links`);
      const data = await response.json();
      
      if (data.success) {
        setNewsLinks(data.data);
      }
    } catch (err) {
      console.error('Error fetching news links:', err);
      setError('Failed to fetch news sources');
    }
  };

  const fetchAllNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/news`);
      const data = await response.json();
      
      if (data.success) {
        setNewsData(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news data');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsBySource = async (sourceIndex: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/news/source/${sourceIndex}`);
      const data = await response.json();
      
      if (data.success) {
        setNewsData([data.data]);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error fetching news from source:', err);
      setError('Failed to fetch news from source');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">News Integration Example</h2>
      
      {/* News Sources */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Available News Sources ({newsLinks.length})</h3>
        <div className="space-y-2">
          {newsLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-3 bg-gray-100 rounded">
              <div>
                <span className="font-medium">{link.name}</span>
                <span className="text-sm text-gray-600 ml-2">{link.url}</span>
              </div>
              <button
                onClick={() => fetchNewsBySource(link.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Fetch
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fetch All Button */}
      <button
        onClick={fetchAllNews}
        disabled={loading}
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 mb-4"
      >
        {loading ? 'Fetching...' : 'Fetch All News'}
      </button>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
          {error}
        </div>
      )}

      {/* News Data Display */}
      {newsData.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Fetched News Data</h3>
          <div className="space-y-3">
            {newsData.map((item, index) => (
              <div key={index} className="p-4 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{item.source}</h4>
                  <span className={item.success ? 'text-green-600' : 'text-red-600'}>
                    {item.success ? '✓ Success' : '✗ Failed'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.url}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Fetched at: {new Date(item.fetchedAt).toLocaleString()}
                </p>
                {item.error && (
                  <p className="text-sm text-red-600 mt-2">Error: {item.error}</p>
                )}
                {item.data && (
                  <div className="mt-2 text-sm">
                    <p>Status: {item.data.status}</p>
                    <p>Content Type: {item.data.contentType}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Example of using it in your App.tsx:
// 
// import { NewsIntegrationExample } from './components/NewsIntegrationExample';
// 
// function App() {
//   return (
//     <div>
//       <NewsIntegrationExample />
//     </div>
//   );
// }
