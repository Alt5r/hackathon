# 🌐 LAN Access Configuration - TruthCapital

## ✅ Both Servers are Now Accessible on LAN!

### 📡 Access URLs for Friends on Same Network

**Frontend (Main App):**
```
http://192.168.0.85:5173
```

**Backend API (Direct Access):**
```
http://192.168.0.85:3001
```

---

## 🎯 For Your Friend to Use the App:

Your friend should:
1. Open their web browser
2. Navigate to: **`http://192.168.0.85:5173`**
3. The frontend will automatically connect to the backend at `http://192.168.0.85:3001`
4. Click the **"News Monitor"** button to test the backend connection

---

## 📱 Quick Connection Test

### For Your Friend to Test Backend Connection:

Open this URL in their browser:
```
http://192.168.0.85:3001/health
```

Should display:
```json
{"status":"OK","message":"TruthCapital Backend is running"}
```

---

## 🔧 What Was Changed:

### 1. Frontend Environment Variables (`.env`)
Changed from:
```
VITE_API_URL=http://localhost:3001
```

To:
```
VITE_API_URL=http://192.168.0.85:3001
```

This tells the frontend to connect to your computer's LAN IP instead of localhost.

### 2. Vite Configuration (`vite.config.ts`)
Set server to bind to all network interfaces:
```typescript
server: {
  host: '0.0.0.0',  // Accessible from any device on network
  port: 5173,
}
```

### 3. Backend CORS Configuration
Already configured to accept requests from all localhost origins, including LAN IPs.

---

## � Current Server Status

✅ **Backend**: Running on `192.168.0.85:3001`
✅ **Frontend**: Running on `192.168.0.85:5173`
✅ **Network**: Both accessible on LAN
✅ **API Connection**: Frontend configured to use LAN IP for backend

---

## � Testing from Different Devices

### From Your Computer (Host):
- Frontend: http://localhost:5173 OR http://192.168.0.85:5173
- Backend: http://localhost:3001 OR http://192.168.0.85:3001

### From Friend's Device (Same Network):
- Frontend: http://192.168.0.85:5173
- Backend: http://192.168.0.85:3001

---

## � Troubleshooting

### Issue: Friend can see frontend but gets "Backend Offline" error

**Solution:** Already fixed! The `.env` file now uses your LAN IP (`192.168.0.85:3001`) instead of `localhost:3001`.

### Issue: Friend cannot access either service

**Possible Causes:**
1. **Firewall blocking**: You may need to allow ports 3001 and 5173
   ```bash
   sudo ufw allow 3001/tcp
   sudo ufw allow 5173/tcp
   ```

2. **IP address changed**: Your computer's IP might have changed
   ```bash
   hostname -I  # Check current IP
   ```
   If different from 192.168.0.85, update the `.env` file and restart frontend.

3. **Same network**: Ensure both devices are on the same WiFi/network

### Issue: Backend works but shows no data

Check the News Monitor component in the frontend - it should show:
- ✅ Backend Online status
- List of 20 finance news sources
- "Fetch All News" button working

---

## 🔄 Restart Commands (If Needed)

### Stop Everything:
```bash
lsof -ti:3001 | xargs kill -9  # Stop backend
lsof -ti:5173 | xargs kill -9  # Stop frontend
```

### Start Backend:
```bash
cd /home/rowan/Skrivebord/UCL/hackathon/hackathon-backend
npx ts-node src/server.ts &
```

### Start Frontend:
```bash
cd /home/rowan/Skrivebord/UCL/hackathon
npm run dev &
```

---

## 📊 API Endpoints Available

All endpoints accessible at `http://192.168.0.85:3001/api/news/`:

- **GET `/health`** - Server health check
- **GET `/api/news`** - Fetch news from all sources
- **GET `/api/news/links`** - Get list of all news sources
- **GET `/api/news/source/:index`** - Fetch news from specific source (0-19)
- **GET `/api/news/category/:category`** - Get sources by category
- **GET `/api/news/priority/high`** - Get high-priority sources only

---

## 📝 Important Notes

1. **IP Address**: `192.168.0.85` is your current LAN IP. If your router assigns a new IP, you'll need to:
   - Update the `.env` file
   - Restart the frontend
   - Give your friend the new URL

2. **Port Forwarding**: Not needed for LAN access, only if you want internet access

3. **HTTPS**: Currently using HTTP. For production, you'd want HTTPS

4. **Performance**: Both devices should be on the same network for best performance

---

## 🎉 Success Checklist

- [x] Backend running and accessible via LAN IP
- [x] Frontend running and accessible via LAN IP  
- [x] Frontend configured to use LAN IP for backend API
- [x] CORS configured to accept LAN connections
- [x] Environment variables updated
- [x] News sources configured (20 finance sources)

---

**Share this URL with your friend:**
## 🔗 http://192.168.0.85:5173

They should be able to access the full TruthCapital app now!
