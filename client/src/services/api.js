import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://fintrack-ph48.onrender.com',
 baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('expense_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
