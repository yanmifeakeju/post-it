const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

const sequelize = require('./sequelize');
async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.sync();
    console.log('Database connection OK!'.green.inverse);
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

const errorHandler = require('./middlware/error');
const group = require('./routes/group');
const auth = require('./routes/auth');
const { protect } = require('./middlware/auth');

app.use('/api/v1/auth', auth);
app.use('/api/v1/group', protect, group);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  assertDatabaseConnectionOk();
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.bgBlue
  );
});

process.on('unhandledRejection', (error, promise) => {
  console.log(`Unhandled Rejection: ${error.message}`.red);
  server.close(() => process.exit(1));
});
