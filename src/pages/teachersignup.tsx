import React, { useState } from 'react';

export default function TeacherSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role: 'teacher',
        }),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Teacher signed up successfully!');
        // Optionally redirect to teacher login or dashboard
        // window.location.href = '/teacher/login';
      } else {
        alert(`Signup failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred while signing up.');
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <h1>Teacher Signup</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Sign Up</button>
    </form>
  );
}
