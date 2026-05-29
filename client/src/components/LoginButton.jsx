import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export function LoginButton() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await api.post('/api/auth/google', {
        token: credentialResponse.credential,
      });

      setUser(res.data.token, res.data.user);
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.error('Google login failed')}
    />
  );
}

