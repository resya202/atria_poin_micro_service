const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');
const apiRoutes = require('./routes/api');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});
app.use('/api/', limiter);

// Middleware dasar
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routing
app.use('/api', apiRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
