require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
};
