const express = require('express');
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Body Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// Routes HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// GET route
app.get('/api/notes', (req, res) => {
    let notesDB = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));
    res.json(notesDB);
})

// POST route
app.post('/api/notes', (req, res) => {
    let id = uniqid()
    let reqBody = req.body;
    let newNote = {
        "title": reqBody.title,
        "text": reqBody.text,
        "id": id
    }
    let notesDB = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));
    notesDB.push(newNote);
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notesDB))
    res.json(notesDB);
})

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});