const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const expenseRoutes = require('./routes/expenses');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/expense-tracker';

// Security + performance for production
app.use(helmet());
app.use(compression());

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.get('/api/health', (req, res) => {
  res.json({ message: 'Expense Tracker API is running' });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
