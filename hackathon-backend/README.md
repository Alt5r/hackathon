# TruthCapital Backend 🚀

Backend API for TruthCapital - an AI-powered misinformation detection platform for financial news. This service fetches news articles from various news websites to enable real-time verification and deepfake detection.

## Features ✨

- 📰 Fetches news articles from multiple predefined news sources
- 🔄 Concurrent request handling with proper error management
- 🛡️ CORS enabled for frontend integration
- 📊 Structured REST API with TypeScript
- ⚡ Fast and reliable news aggregation
- 🎯 Source-specific and bulk news retrieval

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **HTTP Client**: Axios
- **Testing**: Jest

## Project Structure

```
hackathon-backend/
├── src/
│   ├── app.ts                  # Express app setup with middleware
│   ├── server.ts               # Server entry point
│   ├── routes/
│   │   └── news.ts             # News API routes
│   ├── controllers/
│   │   └── newsController.ts   # Request handlers
│   ├── services/
│   │   └── newsService.ts      # Business logic for fetching news
│   ├── data/
│   │   └── newsLinks.json      # Configured news source URLs
│   ├── utils/
│   │   └── httpClient.ts       # HTTP request utilities
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── tests/
│   └── newsService.test.ts     # Unit tests
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Installation 🛠️

1. **Navigate to the backend directory**:
   ```bash
   cd hackathon-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

## Usage 🚀

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Running Tests
```bash
npm test
```

The server will start on `http://localhost:3001` (or your configured PORT).

## API Endpoints 📡

### Health Check
```http
GET /health
```
Returns server status.

**Response**:
```json
{
  "status": "OK",
  "message": "TruthCapital Backend is running"
}
```

### Get All News
```http
GET /api/news
```
Fetches news from all configured sources.

**Response**:
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "source": "bbc.com",
      "url": "https://www.bbc.com/news",
      "data": { ... },
      "fetchedAt": "2025-10-18T12:00:00.000Z",
      "success": true
    }
  ]
}
```

### Get News by Source
```http
GET /api/news/source/:index
```
Fetches news from a specific source by index (0-based).

**Response**:
```json
{
  "success": true,
  "data": {
    "source": "bbc.com",
    "url": "https://www.bbc.com/news",
    "data": { ... },
    "fetchedAt": "2025-10-18T12:00:00.000Z",
    "success": true
  }
}
```

### Get News Links
```http
GET /api/news/links
```
Returns all configured news source links.

**Response**:
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": 0,
      "url": "https://www.bbc.com/news",
      "name": "bbc.com",
      "active": true
    }
  ]
}
```

## Configuration 🔧

### Adding News Sources

Edit `src/data/newsLinks.json`:
```json
[
  "https://www.bbc.com/news",
  "https://www.cnn.com",
  "https://www.reuters.com",
  "https://www.theguardian.com/international",
  "https://www.nytimes.com",
  "https://www.aljazeera.com"
]
```

## Integration with Frontend 🔗

The backend is configured to work with the TruthCapital frontend running on `http://localhost:5173` (Vite default).

Example frontend fetch:
```typescript
const response = await fetch('http://localhost:3001/api/news');
const data = await response.json();
console.log(data);
```

## Error Handling

All endpoints return structured error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

ISC License