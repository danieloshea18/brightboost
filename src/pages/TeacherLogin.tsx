import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeacherLogin = () => {
  // 1. State for email/password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. handleLogin fetch call
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) ,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        
        // Check if user is a teacher
        if (data.user && data.user.role !== 'teacher') {
          setError('This login is only for teachers');
          localStorage.removeItem('authToken');
          return;
        }
        
        // Store user data
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Redirect to dashboard
        window.location.href = '/teacher/dashboard';
      } else {
        setError(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold">Teacher Login</h1>
        </div>
        
        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-destructive">
            {error}
          </div>
        )}
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }} 
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border p-2"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border p-2"
              placeholder="Enter your password"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link to="/teacher/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;
