import { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import Dashboard from '../components/Dashboard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { AuthContext } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/api/expenses');
      setExpenses(response.data);
    } catch (err) {
      setError('Unable to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await api.post('/api/expenses', expense);
      setExpenses((current) => [response.data, ...current]);
    } catch (err) {
      setError('Failed to add expense');
    }
  };

  const removeExpense = async (id) => {
    try {
      await api.delete(`/api/expenses/${id}`);
      setExpenses((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header id="overview" className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-indigo-600">Expense Tracker Dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Welcome back, {user?.name}.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600 sm:text-lg">
            Manage your personal expenses, compare categories, and spot spending trends with your own dashboard.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div id="new-expense" className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70">
              <h2 className="text-xl font-semibold text-slate-900">Add a new expense</h2>
              <p className="mt-2 text-sm text-slate-500">Quickly log purchases and keep your budget up to date.</p>
              <div className="mt-6">
                <ExpenseForm onSubmit={addExpense} />
              </div>
            </div>

            <div id="recent-expenses" className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/70">
              <h2 className="text-xl font-semibold text-slate-900">Recent expenses</h2>
              <p className="mt-2 text-sm text-slate-500">Most recent activity is shown first so you always know where your money goes.</p>
              <div className="mt-6">
                {loading ? (
                  <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-500">Loading expenses...</div>
                ) : (
                  <ExpenseList expenses={expenses} onDelete={removeExpense} />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div id="insights">
              <Dashboard expenses={expenses} />
            </div>
            {error && (
              <div className="rounded-3xl bg-rose-50 p-5 text-rose-700 shadow-sm">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
