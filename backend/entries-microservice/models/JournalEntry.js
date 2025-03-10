const mongoose = require('mongoose');

// Use 'createdAt' instead of 'date' for consistency with backend logic
const JournalEntrySchema = new mongoose.Schema({
  wellbeing: {
    type: Number,
    required: true,
  },
  emotions: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
  },
  sleep: {
    type: String,
    required: true,
  },
  journal: {
    type: String,
    maxlength: 300,
  },
  _u_ID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,  // This will automatically set the created date
  },
});

// Helper function to limit array length
function arrayLimit(val) {
  return val.length <= 3;
}

const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);

module.exports = JournalEntry;