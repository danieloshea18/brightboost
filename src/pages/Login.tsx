
// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      login(response.token, response.user);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-20 w-24 h-24 rounded-full bg-blue-200 opacity-70 animate-float"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-indigo-200 opacity-60 animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-cyan-200 opacity-60 animate-float-slow"></div>
      </div>
      
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl backdrop-blur-sm w-full max-w-md z-10 border border-blue-100">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Teacher Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-blue-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-blue-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-700">
            Don't have an account?{' '}
            <Link to="/teacher/signup" className="text-blue-700 font-bold hover:text-blue-900 hover:underline transition-colors">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-blue-700 mt-2">
            <Link to="/" className="text-blue-700 font-bold hover:text-blue-900 hover:underline transition-colors">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
