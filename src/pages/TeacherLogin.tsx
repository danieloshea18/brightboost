import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Cloud from '@/components/Cloud';
import { Button } from '@/components/ui/button';

const TeacherLogin = () => {
  // 1. State for email/password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. handleLogin fetch call
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        // If you plan to differentiate teacher vs. student, check data.user.role

        window.location.href = '/teacher/dashboard';
      } else {
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-brightbots-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Clouds in background */}
      <Cloud className="top-10 left-10" />
      <Cloud className="bottom-20 right-5" />
      <Cloud className="top-1/2 -left-10" />
      
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2 text-foreground">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-brightbots-purple">Teacher Login</h1>
        <p className="text-center mb-8 text-lg">Please login or create an account to continue</p>
        
        {/* 3. Input fields for email/password */}
        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none"
          />
        </div>

        {/* 4. Hook up handleLogin */}
        <div className="space-y-6">
          <Button
            onClick={handleLogin}
            className="w-full py-6 text-xl bg-brightbots-purple hover:bg-brightbots-purple/90"
          >
            Login
          </Button>

          {/* 5. If you have a signup route */}
          <Button
            variant="outline"
            className="w-full py-6 text-xl border-brightbots-purple text-brightbots-purple hover:bg-brightbots-purple/10"
            as={Link}
            to="/teacher/signup"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
