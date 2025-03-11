const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const connectDB = require('./db');
connectDB();

// Mongoose Schema for Journal Entry
const entrySchema = new mongoose.Schema({
  wellbeing: { type: Number, required: true },
  emotions: { type: [String], required: true },
  sleep: { type: String, required: true },
  journal: { type: String, maxlength: 300 },
  _u_ID: { type: String, required: true },
  createdAt: { type: Date, required: true},
});

const Entry = mongoose.model("Entry", entrySchema);


// API endpoint to retrieve journal entries
app.get('/entry/:id/:quantity', async (req, res) => {
  // Retrieve based on the ID and return a promise.
  const _id = req.params.id;
  const quantity = req.params.quantity;
  const entries = await Entry.find({ _u_ID: _id })
  .sort({ createdAt: -1 }) // Sort by date in descending order (most recent first)
  .limit(parseInt(quantity))
  .lean();

  entries.forEach(entry => {
    if (entry.createdAt && entry.createdAt.$date) {
      entry.createdAt = new Date(entry.createdAt.$date);
    }
  });
  if (entries.length > 0) {
    res.status(200).send(entries)
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


// API endpoint to accept journal entries
app.post('/entry', async (req, res) => {
  const { wellbeing, emotions, sleep, journal, _u_ID } = req.body;
  try {
    // Check if user already submitted an entry today
    const todayEntry = await Entry.findOne({_u_ID});
    let hourDiff = 0
    if (todayEntry.length == 0) {
        hourDiff = 25
    } else {
        const today = new Date()
        const lastEntry = latest[0].createdAt
        hourDiff = Math.abs(today - lastEntry)  / (3600000);
    }

    if (hourDiff < 24.0) {
        res.status(409).json({ error: "You can only post once per day. Try again later" });
    } else {
      const newEntry = new Entry({
      wellbeing,
      emotions,
      sleep,
      journal,
      _u_ID,
      _createdAt: new Date()

      });
      
      await newEntry.save();
      console.log('Entry successfully logged for user:', _u_ID);  
      res.status(200).json({ message: 'Entry successfully logged!' });    
    }} catch (err) {
    console.error('Error saving entry:', err);  
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Entries server listening on port ${PORT}...`);
});