require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { initAppRoutes, seedAdmin } = require('@luikingkit/auth-simplified');
const router = require('./routes');
const { errorHandler } = require('./middleware');

const app = express();
const port = 3000;

app.use(cors());

initAppRoutes(app, router, errorHandler);

(async () => {
  try {
    const dbUri = process.env.DB_URI;
    await mongoose.connect(dbUri);
    console.log('mongodb connected');
    await seedAdmin();

    app.listen(port, () => {
      console.log(`Protected jsonplaceholder listening on port ${port}`);
    });
  } catch (error) {
    console.log('Server init error:', error.message);
  }
})();
