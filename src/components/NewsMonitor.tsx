import { useState, useEffect } from 'react';
import { Shield, RefreshCw, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { newsApi, NewsLink, FetchedNewsData } from '../services/newsApi';

export function NewsMonitor() {
  const [newsLinks, setNewsLinks] = useState<NewsLink[]>([]);
  const [newsData, setNewsData] = useState<FetchedNewsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check server health on mount
  useEffect(() => {
    checkServerHealth();
    loadNewsLinks();
  }, []);

  const checkServerHealth = async () => {
    try {
      await newsApi.checkHealth();
      setServerStatus('online');
    } catch (err) {
      console.error('Server health check failed:', err);
      setServerStatus('offline');
    }
  };

  const loadNewsLinks = async () => {
    try {
      const links = await newsApi.getNewsLinks();
      setNewsLinks(links);
    } catch (err) {
      console.error('Failed to load news links:', err);
    }
  };

  const handleFetchAllNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await newsApi.fetchAllNews();
      setNewsData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchBySource = async (sourceIndex: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await newsApi.fetchNewsBySource(sourceIndex);
      setNewsData([data]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[rgb(151,223,252)] to-[rgb(173,252,146)] p-3 rounded-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[rgb(114,120,141)] dark:text-white">
              News Monitor
            </h2>
            <p className="text-sm text-[rgb(114,120,141)] dark:text-white/70 opacity-70">
              Real-time news aggregation from {newsLinks.length} sources
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge 
            className={
              serverStatus === 'online' 
                ? 'bg-[rgba(15,255,149,0.2)] text-[rgb(15,255,149)] border-[rgb(15,255,149)]'
                : serverStatus === 'offline'
                ? 'bg-[rgba(212,24,61,0.2)] text-[#d4183d] border-[#d4183d]'
                : 'bg-gray-200 text-gray-600 border-gray-400'
            }
          >
            {serverStatus === 'online' ? '● Backend Online' : serverStatus === 'offline' ? '● Backend Offline' : '● Checking...'}
          </Badge>
          <Button
            onClick={handleFetchAllNews}
            disabled={loading || serverStatus !== 'online'}
            className="bg-gradient-to-r from-[rgb(151,223,252)] to-[rgb(173,252,146)] text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Fetching...' : 'Fetch All News'}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">Error</h3>
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Server Offline Warning */}
      {serverStatus === 'offline' && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Backend Server Offline</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                Make sure the backend server is running on http://localhost:3001
              </p>
              <Button
                onClick={checkServerHealth}
                variant="outline"
                size="sm"
                className="mt-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Retry Connection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* News Sources */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[rgb(114,120,141)] dark:text-white mb-4">
          Available News Sources
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsLinks.map((link) => (
            <Card key={link.id} className="p-4 border-2 border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)]">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-[rgb(114,120,141)] dark:text-white">
                    {link.name}
                  </h4>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-[rgb(151,223,252)] hover:underline flex items-center gap-1 mt-1"
                  >
                    Visit site
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <Badge variant="outline" className="text-xs">
                  {link.active ? '✓ Active' : 'Inactive'}
                </Badge>
              </div>
              <Button
                onClick={() => handleFetchBySource(link.id)}
                disabled={loading || !link.active || serverStatus !== 'online'}
                variant="outline"
                size="sm"
                className="w-full mt-2 border-[rgba(151,223,252,0.3)] hover:bg-[rgba(151,223,252,0.1)] text-[rgb(114,120,141)] dark:text-white"
              >
                Fetch from {link.name}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Fetched News Data */}
      {newsData.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[rgb(114,120,141)] dark:text-white mb-4">
            Fetched News Data ({newsData.length} sources)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {newsData.map((item, index) => (
              <Card key={index} className="p-6 border-2 border-[rgba(151,223,252,0.3)] dark:border-[rgba(151,223,252,0.4)]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-[rgb(114,120,141)] dark:text-white">
                    {item.source}
                  </h4>
                  {item.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[rgb(151,223,252)] hover:underline flex items-center gap-1 mb-3"
                >
                  {item.url}
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="text-xs text-[rgb(114,120,141)] dark:text-white/70 opacity-70 mb-2">
                  Fetched: {new Date(item.fetchedAt).toLocaleString()}
                </div>

                {item.success && item.data && (
                  <div className="bg-[rgba(151,223,252,0.1)] dark:bg-[rgba(151,223,252,0.2)] rounded-lg p-3 mt-3">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[rgb(114,120,141)] dark:text-white/70">Status:</span>
                        <span className="font-mono text-[rgb(114,120,141)] dark:text-white">
                          {item.data.status} {item.data.statusText}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(114,120,141)] dark:text-white/70">Content Type:</span>
                        <span className="font-mono text-xs text-[rgb(114,120,141)] dark:text-white">
                          {item.data.contentType?.split(';')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {item.error && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mt-3">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Error: {item.error}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
