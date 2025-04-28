// src/config/db.js
const mongoose = require('mongoose');

module.exports = uri =>
  mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
