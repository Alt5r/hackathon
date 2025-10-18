import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { newsApi } from '../services/newsApi';

export function ApiDebugInfo() {
  const [envUrl, setEnvUrl] = useState<string>('');
  const [healthStatus, setHealthStatus] = useState<string>('Checking...');

  useEffect(() => {
    // @ts-ignore
    const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:3001';
    setEnvUrl(apiUrl);

    // Test connection
    newsApi.checkHealth()
      .then(() => setHealthStatus('✅ Connected'))
      .catch((err) => setHealthStatus(`❌ ${err.message}`));
  }, []);

  return (
    <Card className="fixed bottom-4 right-4 p-4 max-w-sm bg-white dark:bg-gray-800 shadow-lg z-50 border-2 border-blue-500">
      <h3 className="font-bold text-sm mb-2">🔍 API Debug Info</h3>
      <div className="text-xs space-y-1">
        <div>
          <strong>Backend URL:</strong>
          <Badge variant="outline" className="ml-2 font-mono text-xs">
            {envUrl}
          </Badge>
        </div>
        <div>
          <strong>Expected:</strong>
          <code className="ml-2 text-green-600">http://192.168.0.85:3001</code>
        </div>
        <div>
          <strong>Status:</strong>
          <span className="ml-2">{healthStatus}</span>
        </div>
        <div className="pt-2 border-t mt-2">
          <p className="text-gray-600">
            If URL shows localhost, restart the frontend server.
          </p>
        </div>
      </div>
    </Card>
  );
}
