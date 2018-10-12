const Note = require('../models/note.model');

exports.create = (req, res) =>{
    //validate request
    if(!req.body.content){
        return res.status(400).send({
            message : "Note content cannot be empty"
        })
    }

    //create note
    const note = new Note({
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    })

    //save the note
    note.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Note'
        });
    });

};
