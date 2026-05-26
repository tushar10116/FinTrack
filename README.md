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
