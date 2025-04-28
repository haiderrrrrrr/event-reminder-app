// src/server.js
const express = require('express');
require('dotenv').config();
require('express-async-errors');

const authRoutes  = require('./routes/auth');
const eventRoutes = require('./routes/events');

const app = express();
app.use(express.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

module.exports = app;
