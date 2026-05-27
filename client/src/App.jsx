import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
<<<<<<< HEAD
=======
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('https://fintrack-ph48.onrender.com/api/expenses');
      setExpenses(response.data);
    } catch (err) {
      setError('Unable to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await axios.post('https://fintrack-ph48.onrender.com/api/expenses', expense);
      setExpenses((current) => [response.data, ...current]);
    } catch (err) {
      setError('Failed to add expense');
    }
  };

  const removeExpense = async (id) => {
    try {
      await axios.delete(`https://fintrack-ph48.onrender.com/api/expenses/${id}`);
      setExpenses((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

>>>>>>> 1493592dea392b374a52fcae50a209888ff9ada8
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-100 text-slate-900">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
