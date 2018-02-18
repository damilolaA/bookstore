const express = require('express'),
  bps = require('body-parser'),
  morgan = require('morgan'),
  cors = require('cors'),
  api = require('../api/api.js'),
  app = express();

// mount body-parser middleware to parse req.body
app.use(bps.json());
app.use(bps.urlencoded({ extended: false }));

// middleware to handle cross origin resource sharing
app.use(cors());

// middleware to log request to our endpoints
app.use(morgan('dev'));

// mount api on /api/v1 path
app.use('/api/v1', api);

// error handling middleware to handle application errors
app.use((err, req, res, next) => {
  res.status(500).json(err.message);

  next();
});

module.exports = app;
