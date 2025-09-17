import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const response = await api.post('/users/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        navigate('/');
      }
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Login to LockFund</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input 
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input 
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">
              Sign In
            </button>
          </div>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a className="font-medium text-indigo-600 hover:text-indigo-500" href="/register">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
