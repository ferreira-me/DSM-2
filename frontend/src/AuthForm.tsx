import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    alias: '',
    mail: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}${endpoint}`,
        {
          ...formData,
          ...(isLogin ? {} : { alias: formData.alias })
        }
      );

      setSuccess(isLogin ? 'Login realizado com sucesso!' : 'Cadastro realizado com sucesso!');
      console.log(response.data);

      if (isLogin) {
        navigate('/userpage'); // Redireciona para UserPage após login bem-sucedido
      } else {
        setFormData({ alias: '', mail: '', password: '' });
        navigate('/carousel'); // Redireciona para Carousel após cadastro bem-sucedido
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao processar a solicitação.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : 'underline'}>Login</button>
        <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : 'underline'}>Cadastro</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
        {!isLogin && (
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
