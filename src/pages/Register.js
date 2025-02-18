import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    role: 'common_user',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.username || !form.password) {
      setError('Faltan campos requeridos');
      return;
    }

    try {
      const data = await registerUser(form);
      if (data.message === 'Usuario registrado exitosamente.') {
        alert('Te has registrado con éxito. Ahora inicia sesión.');
        navigate('/login');
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error(error);
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
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
        <br/>
        <label>Rol</label><br/>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="common_user">common_user</option>
          <option value="master">master</option>
        </select>
        <br/><br/>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
