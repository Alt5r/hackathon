# TruthCapital - Full Stack Setup Complete! 🎉

## ✅ Both Servers are Now Running

### 🔧 Backend Server (Express + TypeScript)
- **URL**: http://localhost:3001
- **Status**: ✅ Running
- **Location**: `hackathon-backend/`

### 🎨 Frontend Server (React + Vite)
- **URL**: http://localhost:3000
- **Status**: ✅ Running  
- **Location**: `src/`

---

## 📡 Backend API Endpoints

### Health Check
```bash
GET http://localhost:3001/health
```

### Get All News Sources
```bash
GET http://localhost:3001/api/news/links
```

### Fetch News from All Sources
```bash
GET http://localhost:3001/api/news
```

### Fetch News from Specific Source
```bash
GET http://localhost:3001/api/news/source/0
# Replace 0 with the source index (0-5)
```

---

## 🧪 Test the Integration

### Using cURL (Terminal)
```bash
# Health check
curl http://localhost:3001/health

# Get news links
curl http://localhost:3001/api/news/links

# Fetch from BBC (source 0)
curl http://localhost:3001/api/news/source/0
```

### Using the Frontend
1. Open http://localhost:3000 in your browser
2. Click the **"News Monitor"** button in the header
3. You'll see:
   - Backend server status (Online/Offline)
   - All 6 configured news sources
   - "Fetch All News" button
   - Individual fetch buttons for each source

---

## 📂 Project Structure

```
hackathon/
├── hackathon-backend/          # Backend Express Server
│   ├── src/
│   │   ├── server.ts           # Server entry point
│   │   ├── app.ts              # Express app configuration
│   │   ├── routes/
│   │   │   └── news.ts         # News API routes
│   │   ├── controllers/
│   │   │   └── newsController.ts
│   │   ├── services/
│   │   │   └── newsService.ts  # News fetching logic
│   │   ├── data/
│   │   │   └── newsLinks.json  # News source URLs
│   │   ├── utils/
│   │   │   └── httpClient.ts   # HTTP request wrapper
│   │   └── types/
│   │       └── index.ts        # TypeScript types
│   ├── examples/
│   │   ├── fetch-news.js       # Example usage script
│   │   └── integration-example.tsx
│   ├── package.json
│   ├── .env                    # Backend environment variables
│   └── README.md
│
└── src/                        # Frontend React App
    ├── components/
    │   ├── NewsMonitor.tsx     # 🆕 News monitoring component
    │   └── ...
    ├── services/
    │   └── newsApi.ts          # 🆕 Backend API client
    ├── App.tsx                 # Updated with News Monitor
    └── ...
```

---

## 🔄 How It Works

1. **Backend** fetches news from configured sources in `newsLinks.json`:
   - BBC News
   - CNN
   - Reuters
   - The Guardian
   - New York Times
   - Al Jazeera

2. **Frontend** connects to the backend via the `newsApi` service

3. **NewsMonitor Component** provides:
   - Real-time server status
   - Visual interface to fetch news
   - Display fetched data with status indicators
   - Error handling

---

## 🚀 Quick Start Commands

### Start Backend
```bash
cd hackathon-backend
npm run dev
```

### Start Frontend (in a new terminal)
```bash
cd hackathon
npm run dev
```

### Or use the background processes already running!
Both servers are currently running in the background.

---

## 🔧 Configuration

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

---

## 📝 Adding More News Sources

Edit `hackathon-backend/src/data/newsLinks.json`:
```json
[
  "https://www.bbc.com/news",
  "https://www.cnn.com",
  "https://your-new-source.com"
]
```

The backend will automatically pick up the changes (may need restart).

---

## 🎯 Next Steps

1. **Integrate with AI**: Connect news data to misinformation detection
2. **Add Parsing**: Extract article text and metadata
3. **Store Results**: Save fetched news to a database
4. **Enhance UI**: Display parsed articles in StoryCard components
5. **Add Caching**: Prevent redundant fetches
6. **Implement Webhooks**: Real-time news updates

---

## 💡 Features Implemented

✅ Express backend with TypeScript
✅ News fetching from multiple sources
✅ RESTful API endpoints
✅ CORS enabled for frontend
✅ React frontend integration
✅ NewsMonitor component with real-time status
✅ Error handling and loading states
✅ Service layer architecture
✅ Environment variable configuration
✅ Comprehensive documentation

---

## 🐛 Troubleshooting

### Backend not responding?
```bash
cd hackathon-backend
npm run dev
```

### Frontend can't connect?
- Check that backend is running on port 3001
- Verify CORS settings in `app.ts`
- Check `.env` file has correct `VITE_API_URL`

### Module errors?
```bash
# Backend
cd hackathon-backend && npm install

# Frontend  
cd .. && npm install
```

---

## 📚 Learn More

- Backend README: `hackathon-backend/README.md`
- Example Script: `hackathon-backend/examples/fetch-news.js`
- API Service: `src/services/newsApi.ts`
- News Monitor: `src/components/NewsMonitor.tsx`

---

**Happy Coding! 🚀**
