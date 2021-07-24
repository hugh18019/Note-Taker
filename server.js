const express = require('express');
const path = require('path');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize the app and create a port
const PORT = process.env.PORT || 3001;
const app = express();

// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
