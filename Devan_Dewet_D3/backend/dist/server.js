"use strict";

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var userRoutes = require('./routes/users');
var playlistRoutes = require('./routes/playlistRoutes');
var songRoutes = require('./routes/songRoutes');
var searchRoutes = require('./routes/searchRoutes');
var app = express();
var PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://devandewet:Ky!e0106@cluster0.rpub9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB connected');
})["catch"](function (err) {
  return console.log(err);
});

// Show method and URL - test
app.use(function (req, res, next) {
  console.log("".concat(req.method, " ").concat(req.url));
  next();
});

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/search', searchRoutes);

// Serve static files from the React app
app.use(express["static"](path.join(__dirname, '../frontend/public')));

// Catch-all route for serving index.html for any routes not handled by the API
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});