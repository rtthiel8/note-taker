const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { notes } = require('./db/db');

function addNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    );
    return note;
}


app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // add note to json file and notes array in this function
    const note = addNewNote(req.body, notes);

    res.json(note);
});

app.listen(PORT, () => {
    console.log(`API server now on PORT ${PORT}!`);
});

