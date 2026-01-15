const express = require('express');
const helmet = require('helmet'); // New security import
const cors = require('cors');     // FIX: You forgot to require cors
require('dotenv').config();

const app = express();

// Security and Middleware
app.use(helmet());           // Protects against common web vulnerabilities
app.use(cors());             // Allows your mobile app to talk to this server [cite: 243]
app.use(express.json());      // Standard for receiving JSON data

// Environment Variables
const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT || 80; // Uses .env port or defaults to 80

// Routes
app.get('/api/status', (req, res) => {
  res.json({ message: "AWS Backend is reachable from Galway!" });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://34.252.254.167:${PORT}`);
});