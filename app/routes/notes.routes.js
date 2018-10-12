module.exports = (app) => {
    const notes = require('..//controllers/note.controller.js');

    //create a new note
    app.post('/notes', notes.create);

    //find a specific note
    app.get('/notes/:noteId', notes.findOne);
}