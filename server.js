// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variables

// Middleware
app.use(cors());
app.use(bodyParser.json());

// server.js - Add proper CORS configuration
const cors = require('cors');
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : 'http://localhost:5173', // Default Vite dev server port
  credentials: true
}) );

// Use environment variables for sensitive information
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const PORT = process.env.PORT || 3000;

// Mock database
const users = [
  {
    id: '1',
    name: 'Test Teacher',
    email: 'teacher@example.com',
    password: 'password123',
    role: 'teacher'
  },
  {
    id: '2',
    name: 'Test Student',
    email: 'student@example.com',
    password: 'password123',
    role: 'student'
  }
];

// Signup endpoint
app.post('/auth/signup', (req, res) => {
  const { email, password, name, role } = req.body;
  
  // Validation
  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In production, hash the password
    role
  };
  
  // Add to mock database
  users.push(newUser);
  
  // Return success
  res.status(201).json({ 
    message: 'User registered successfully',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  // Find user
  const user = users.find(user => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  // Return user data and token
  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`) ;
});
