# Expense Tracker (MERN)

A simple MERN stack expense tracker with:

- **Express + Node.js** backend
- **MongoDB** via Mongoose
- **React + Vite** frontend

## Setup

1. Install dependencies:
   ```bash
   npm run install-all
   ```
2. Create a `.env` file in `server/` with MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   PORT=4000
   ```
3. Start both backend and frontend:
   ```bash
   npm run dev
   ```

## API

- `GET /api/expenses`
- `POST /api/expenses`
- `DELETE /api/expenses/:id`
- `PUT /api/expenses/:id`

## Notes

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:4000` by default.

## Production build & deployment

1. Build the client and start the server (from project root):

```bash
npm run start:prod
```

2. Or run build separately and serve with another process manager:

```bash
npm run build
cd server
NODE_ENV=production PORT=4000 npm start
```

3. Ensure `MONGODB_URI` in `server/.env` points to your production MongoDB.

### Backend build steps (production)

These steps prepare and run the backend in a production environment.

- Install server dependencies (recommended on the server/host):

```bash
cd server
npm ci
```

- Run tests (optional but recommended):

```bash
npm test
```

- Set environment variables (example):

Linux / macOS:
```bash
export NODE_ENV=production
export PORT=4000
export MONGODB_URI="mongodb://user:pass@host:27017/expense-tracker"
```

Windows (PowerShell):
```powershell
$env:NODE_ENV = "production"
$env:PORT = "4000"
$env:MONGODB_URI = "mongodb://user:pass@host:27017/expense-tracker"
```

- Install production-only dependencies and start the server:

```bash
npm ci --production
node index.js
```

- Recommended: run the server with a process manager (PM2 example):

```bash
npm install -g pm2
pm2 start index.js --name expense-tracker --env production
pm2 save
```

Notes:
- If you use the combined `start:prod` root script it will build the client and start the server (see `package.json`).
- Ensure ports and firewall rules allow traffic, and use a reverse proxy (Nginx) with TLS for public deployments.
