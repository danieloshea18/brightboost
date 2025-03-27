
// src/pages/StudentSignup.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signupUser } from '../services/api';

const StudentSignup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      console.log('Attempting to sign up student:', { name, email, role: 'student' });
      const response = await signupUser(name, email, password, 'student');
      console.log('Signup successful:', response);
      
      // Auto login after successful signup
      if (response && response.token) {
        login(response.token, response.user);
      } else {
        console.error('Invalid response format:', response);
        setError('Server returned an invalid response format');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-200 opacity-70 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-blue-200 opacity-60 animate-float-delay"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-pink-200 opacity-60 animate-float-slow"></div>
      </div>
      
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl backdrop-blur-sm w-full max-w-md z-10 border border-purple-100">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-800">Student Signup</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-purple-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-purple-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
          </div>
          
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
              placeholder="Create a password"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white border border-purple-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Confirm your password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
            } transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all`}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-purple-700">
            Already have an account?{' '}
            <Link to="/student/login" className="text-purple-700 font-bold hover:text-purple-900 hover:underline transition-colors">
              Log in
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

export default StudentSignup;
