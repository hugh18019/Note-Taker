const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// GET Route for notes page
// app.get('/notes', (req, res) => res.json({body});
app.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

app.post('/api/notes', (req, res) => {
  const { id, title, text } = req.body;

  if (title && text) {
    const newNote = {
      id,
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posing note');
  }
});

app.app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
