const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/notes', (req, res) => {
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

module.exports = router;
