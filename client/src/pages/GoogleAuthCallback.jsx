import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function GoogleAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      return;
    }

    if (!token || !id || !name || !email) {
      setError('Google login failed.');
      return;
    }

    setUser(token, { id, name: decodeURIComponent(name), email: decodeURIComponent(email) });
    navigate('/');
  }, [searchParams, navigate, setUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Google sign-in failed</h1>
          <p className="mt-4 text-sm text-slate-600">{error}</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-8 rounded-3xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Return to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Signing you in with Google...</h1>
        <p className="mt-3 text-sm text-slate-500">Please wait while we complete your login.</p>
      </div>
    </div>
  );
}

export default GoogleAuthCallback;
