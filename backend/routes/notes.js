const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1: Fetching notes of a user at /api/notes/fetchnotes

router.get('/fetchnotes' , fetchuser,

    //Here fetchuser is a middleware

    async (req,res) => {
        try{
            const notes = await Notes.find({user:req.user.id});
            res.send(notes);
        }catch(e){
            res.status(500).send('Some error occured');
        }
    }
)

//Route 2: Creating notes of a user at /api/notes/createnotes

router.post('/createnotes' ,fetchuser, [
        body('title','Enter a valid title').isLength({min:3}),
        body('description','Enter a valid Description').isLength({min:5})
    ],

    //Here fetchuser is a middleware

    async (req,res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        try{
            const{title,description,tag} = req.body;
            const notes = await Notes.create({title,description,tag,user:req.user.id});
            res.json(notes)
        }
        catch(e){
            res.status(500).send('Some error occured');
        }
    }
)

//Route 3: Updating notes of a user at PUT /api/notes/updatenotes:id

router.put('/updatenotes/:id' ,fetchuser,

    //Here fetchuser is a middleware

    async (req,res) => { 
        
        const {title, description, tag} = req.body;

        try{
            const newNote = {};
            if(title)   {newNote.title = title};
            if(description)   {newNote.description = description};
            if(tag)   {newNote.tag = tag};

            //Find the note

            let notes = await Notes.findById(req.params.id);
            if(!notes){return res.status(404).send("Not Found")}

            if(notes.user.toString() !== req.user.id){
                return res.status(401).send("Permission Denied")
            }

            notes = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
            res.json({notes});
        }
        catch(e){
            res.status(500).send('Some error occured');
        }

    }

)
//Route 4: Creating notes of a user at  DELETE/api/notes/deletenotes/:id

router.delete('/deletenotes/:id' ,fetchuser,

    //Here fetchuser is a middleware

    async (req,res) => { 
        
        //Find the note
        try{
            let notes = await Notes.findById(req.params.id);
            if(!notes){return res.status(404).send("Not Found")}

            if(notes.user.toString() !== req.user.id){
                return res.status(401).send("Permission Denied")
            }

            notes = await Notes.findByIdAndDelete(req.params.id)
            res.send({"Success":"This has been deleted",notes:notes});
        }catch(e){
            res.status(500).send('Some error occured');
        }
    }

)

module.exports = router