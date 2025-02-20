import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.username || !form.password) {
      setError('Por favor ingresa email, username y contraseña');
      return;
    }

    try {
      const data = await loginUser(form);
      // data = { message, token }
      if (data.token) {
        // Guardamos el token en localStorage
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setError(data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error(error);
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label><br/>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <br/>
        <label>Username</label><br/>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <br/>
        <label>Contraseña</label><br/>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <br/><br/>
        <button type="submit">Login</button>
      </form>
      <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
};

export default Login;
