import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showExpiryMessage, setShowExpiryMessage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    // Después de 60,000 ms (1 minuto), expiramos la sesión local
    const timer = setTimeout(() => {
      setShowExpiryMessage(true);
      localStorage.removeItem('token');
    }, 60000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    if (showExpiryMessage) {
      alert('La sesión ha expirado');
      navigate('/login');
    }
  }, [showExpiryMessage, navigate]);

  return (
    <div>
      <h2>Bienvenido al Home</h2>
      <p>Esta vista está protegida. El token expira en 1 minuto.</p>
    </div>
  );
};

export default Home;
