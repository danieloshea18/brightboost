import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Cloud from '@/components/Cloud';
import { Button } from '@/components/ui/button';

const StudentLogin = () => {
  // Store class code in component state
  const [classCode, setClassCode] = useState('');

  // Handler for submitting class code to the backend
  const handleClassCodeLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Make a POST request to your Node.js endpoint
      // (Change the URL to match your actual backend route)
      const response = await fetch('http://localhost:3000/auth/studentlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classCode }), // Send the class code
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the token (if provided) in localStorage
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        // Redirect the student to their dashboard or any other page
        window.location.href = '/student/dashboard';
      } else {
        // Show an error message if the response isn't OK
        alert(`Login failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during student login:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brightbots-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Clouds in background */}
      <Cloud className="top-10 right-10" />
      <Cloud className="bottom-20 left-5" />
      <Cloud className="top-1/2 -right-10" />

      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2 text-foreground">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-brightbots-pink">Student Login</h1>
        <p className="text-center mb-8 text-lg">Enter your class code or scan your QR code</p>

        {/* Form for entering a class code */}
        <form onSubmit={handleClassCodeLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Enter Class Code"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            className="w-full border border-brightbots-pink rounded-lg p-4 text-xl focus:outline-none focus:ring-2 focus:ring-brightbots-pink"
          />
          <Button
            type="submit"
            className="w-full py-6 text-xl bg-brightbots-pink hover:bg-brightbots-pink/90"
          >
            Log In with Class Code
          </Button>
        </form>

        {/* QR code button (currently no action) */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full py-6 text-xl border-brightbots-pink text-brightbots-pink hover:bg-brightbots-pink/10"
            onClick={() => alert('QR code login not yet implemented!')}
          >
            Scan QR Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
