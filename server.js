const express = require('express');
const path = require('path');
// const noteData = require('./db/db.json');
// const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, './public/notes.html'))
// );

// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, './public/index.html'))
// );

// GET Route for notes page
// app.get('/notes', (req, res) => res.json({body});
app.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      id: uuid(),
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

app.delete(`/api/notes/:id`, (req, res) => {
  var noteId = req.params.id;
  var noteList = [];

  readFromFile('./db/db.json').then(function (data) {
    noteList = JSON.parse(data);
    removeNote(noteList, noteId);
  });
});

function removeNote(noteList, noteId) {
  var removeIdx = 0;
  for (let i = 0; i < noteList.length; i++) {
    // console.log(noteList[i].id);
    // console.log(noteId);
    if (noteList[i].id == noteId) {
      removeIdx = i;
    }
  }
  console.log(removeIdx);
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
