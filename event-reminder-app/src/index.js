// src/index.js
require('dotenv').config();

const connectDB   = require('./config/db');
const reminderJob = require('./middlewares/reminderJob');
const app         = require('./server');

const PORT = process.env.PORT || 4000;

;(async () => {
  await connectDB(process.env.MONGO_URI);
  reminderJob();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
