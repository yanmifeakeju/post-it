const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const db = require('./database/db');
const groups = require('./routes/group');
const errorHandler = require('./middlware/error');

app.use('/api/v1/group', groups);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.bgBlue
  )
);

process.on('unhandledRejection', (error, promise) => {
  console.log(`Unhandled Rejection: ${error.message}`.red);
  server.close(() => process.exit(1));
});
