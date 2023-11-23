const dotenv = require('dotenv');
dotenv.config();

const config = {
  PORT : process.env.PORT,
  AUTH_EMAIL : process.env.AUTH_EMAIL,
  AUTH_PASS : process.env.AUTH_PASS
}

module.exports = config;