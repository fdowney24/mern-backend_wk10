const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// --- DATABASE SCHEMA ---
const QuoteSchema = new mongoose.Schema({
  text: String,
  quote: String,
  createdAt: { type: Date, default: Date.now }
});
const Quote = mongoose.model('Quote', QuoteSchema);

// --- ROUTES ---

// Existing Status Route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: "Online",
    message: "AWS Backend is reachable!",
    owner: "Student Name", // Change this to your name!!!
    timestamp: new Date()
  });
});

// NEW: Route to save data to MongoDB
app.post('/api/save-quote', async (req, res) => {
  try {
    // Adding default values in case one is missing
    const { text = "No text", quote = "No quote" } = req.body;

    const newEntry = new Quote({ text, quote });
    await newEntry.save();

    console.log("📥 Data saved to MongoDB:", newEntry);
    res.status(201).json({ message: "Saved successfully!", data: newEntry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });



