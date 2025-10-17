import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // read token from hash (after #)
    const hash = window.location.hash; // e.g. #token=...
    if (hash && hash.includes('token=')) {
      const token = hash.split('token=')[1];
      if (token) {
        // store token + optionally fetch user details from backend
        localStorage.setItem('token', token);

        // Optionally, call /api/auth/profile to get user details
        // But if backend returned user object in redirect, handle that too.

        // simple: navigate home
        setTimeout(() => {
          navigate('/');
          window.location.reload();  
        }, 1000);
        
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default AuthSuccess;
