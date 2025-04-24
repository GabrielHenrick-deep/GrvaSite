import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Implement actual authentication
    if (email === 'admin@labresearch.com' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <div>
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
        <Lock className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
        Acesso Administrativo
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
        Entre com suas credenciais para acessar o painel
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm bg-gray-700 p-6 space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
          Email
          </label>
          <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
          placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
          Senha
          </label>
          <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
          placeholder="Senha"
          />
        </div>
        </div>

        {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Entrar
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}