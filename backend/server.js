const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const MONGO_URI = "mongodb://localhost:27017/antiragging";

const app = express();

app.use(cors());
app.use(express.json());

// This line makes the 'uploads' directory accessible for viewing files
app.use('/uploads', express.static('uploads'));

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully!');

    app.use('/api/report', require('./routes/report'));
    app.use('/api/students', require('./routes/student'));

    app.listen(5000, () => {
      console.log('🚀 Server is running on port 5000');
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();