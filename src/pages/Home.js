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

    const timer = setTimeout(() => {
      setShowExpiryMessage(true);
      localStorage.removeItem('token');
    }, 60000); // 1 minuto

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
      <p>Esta vista está protegida.</p>
    </div>
  );
};

export default Home;
