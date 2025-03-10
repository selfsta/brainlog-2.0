const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// Middleware to check if user has submitted an entry today
const checkTodayEntry = async (req, res, next) => {
  const { _u_ID } = req.body;
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    const entry = await JournalEntry.findOne({
      _u_ID,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (entry) {
      return res.status(400).json({ error: 'You can only submit one entry per day' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST request to submit an entry
router.post('/', checkTodayEntry, async (req, res) => {
  try {
    const { wellbeing, emotions, sleep, journal, _u_ID } = req.body;

    const newEntry = new JournalEntry({ wellbeing, emotions, sleep, journal, _u_ID });
    await newEntry.save();

    res.status(200).json({ message: 'Entry successfully saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;