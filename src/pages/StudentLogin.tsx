
// src/pages/StudentLogin.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/api';

const StudentLogin: React.FC = () => {
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
      // Verify this is a student account
      if (response.user.role !== 'student') {
        setError('This login is only for students. Please use the teacher login if you are a teacher.');
        setIsLoading(false);
        return;
      }
      login(response.token, response.user);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-200 opacity-70 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-pink-200 opacity-60 animate-float-delay"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-indigo-200 opacity-60 animate-float-slow"></div>
      </div>
      
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl backdrop-blur-sm w-full max-w-md z-10 border border-purple-100">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">Student Login</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-purple-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-purple-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
            } transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-purple-700">
            Don't have an account?{' '}
            <Link to="/student/signup" className="text-purple-700 font-bold hover:text-purple-900 hover:underline transition-colors">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-purple-700 mt-2">
            <Link to="/" className="text-purple-700 font-bold hover:text-purple-900 hover:underline transition-colors">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
