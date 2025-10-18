import axios, { AxiosRequestConfig } from 'axios';

/**
 * Make a GET request to a URL with timeout and headers
 */
export const makeGetRequest = async (url: string, timeout: number = 10000): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      timeout,
      headers: {
        'User-Agent': 'TruthCapital-News-Fetcher/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      validateStatus: (status) => status < 500 // Accept all responses < 500
    };

    const response = await axios.get(url, config);
    
    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: typeof response.data === 'string' ? response.data.substring(0, 5000) : response.data, // Limit data size
      contentType: response.headers['content-type']
    };
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};