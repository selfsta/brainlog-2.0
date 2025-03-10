const mongoose = require('mongoose');

// Connect to MongoDB Atlas using the connection string from .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to "Entries" using Mongoose!');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;