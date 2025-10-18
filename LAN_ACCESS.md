# 🌐 LAN Access Configuration - TruthCapital

## ✅ Both Servers are Now Accessible on LAN!

### 📡 Access URLs

#### From Your PC (localhost):
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

#### From Other Devices on Same Network:
- **Frontend**: http://192.168.0.85:5173
- **Backend**: http://192.168.0.85:3001

---

## 👥 For Your Friend to Access:

Your friend should open their web browser and navigate to:

```
http://192.168.0.85:5173
```

This will load the TruthCapital frontend, which will automatically connect to the backend at:

```
http://192.168.0.85:3001
```

---

## 🔧 What Was Changed:

### 1. Vite Configuration (`vite.config.ts`)
Updated the server configuration to bind to all network interfaces:

```typescript
server: {
  host: '0.0.0.0',  // Bind to all network interfaces (not just localhost)
  port: 5173,
  strictPort: true,
  open: false,
}
```

### 2. Backend CORS Configuration (`hackathon-backend/src/app.ts`)
Already configured to accept requests from all localhost origins, including LAN IPs.

---

## 🔥 Firewall Check (If Connection Still Fails)

If your friend still can't access the frontend, you may need to allow the port through your firewall:

### On Linux (Ubuntu/Debian):
```bash
sudo ufw allow 5173/tcp
sudo ufw allow 3001/tcp
sudo ufw reload
```

### Check if firewall is active:
```bash
sudo ufw status
```

---

## 📱 Test Connection

### From Your Friend's Device:

1. **Test Backend Connection:**
   ```bash
   curl http://192.168.0.85:3001/health
   ```
   Should return: `{"status":"OK","message":"TruthCapital Backend is running"}`

2. **Test Frontend:**
   Open browser and go to: `http://192.168.0.85:5173`

---

## 🚨 Troubleshooting

### If Friend Can Access Backend (3001) But Not Frontend (5173):

1. **Check if frontend is running:**
   ```bash
   lsof -ti:5173
   ```

2. **Check frontend logs:**
   ```bash
   tail -f /home/rowan/Skrivebord/UCL/hackathon/frontend.log
   ```

3. **Restart frontend:**
   ```bash
   cd /home/rowan/Skrivebord/UCL/hackathon
   lsof -ti:5173 | xargs kill -9
   npm run dev
   ```

### If Neither Service is Accessible:

1. **Check your local IP hasn't changed:**
   ```bash
   hostname -I
   ```

2. **Verify both services are running:**
   ```bash
   lsof -ti:3001  # Backend
   lsof -ti:5173  # Frontend
   ```

3. **Check firewall rules:**
   ```bash
   sudo ufw status verbose
   ```

---

## 🎯 Quick Restart Commands

### Restart Both Servers:
```bash
# Stop servers
lsof -ti:3001 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Start backend
cd /home/rowan/Skrivebord/UCL/hackathon/hackathon-backend
nohup npx ts-node src/server.ts > backend.log 2>&1 &

# Start frontend
cd /home/rowan/Skrivebord/UCL/hackathon
nohup npm run dev > frontend.log 2>&1 &
```

---

## 📊 Current Status:

✅ **Backend**: Running on port 3001 (accessible on LAN)
✅ **Frontend**: Running on port 5173 (accessible on LAN)
✅ **Local IP**: 192.168.0.85
✅ **CORS**: Configured to accept all localhost origins
✅ **Network Binding**: Vite configured with `host: '0.0.0.0'`

---

**Share this URL with your friend:**
## 🔗 http://192.168.0.85:5173
