const express = require("express");
const router = express.Router();
const Bug = require("../models/bug.js");

const app = express();

// RETRIEVE all bugs
router.get('/bugs', async (req, res) => {
    try{
        let bugs = await Bug.find({});
        res.status(200).send(bugs);
    } catch(err) {
        res.status(400).send({message:"error"});
    }
});


// RETRIEVE a specific bug
router.get('/bugs/:id', async (req, res) => {
    try {
        let _id = req.params.id;
        let bug = await Bug.findById({_id});

        if (bug) {
            return res.status(200).send(bug);
        }
        res.status(404).send({message:"bug not found"});       
    } catch(err) {
        res.status(400).send({message:"error"});
    }
})


// CREATE a bug
router.post('/bugs', async (req, res) => {
    try{
        const bug = new Bug(req.body);
    
        await bug.save((err, bug) => {
            if (err) return console.error(err);
            console.log("bug added to collection");
        })

        res.status(201).send({message:"bug added to collection"});

    } catch(err) {
        res.status(400).send({message:"error"});
    }
});

// UPDATE a bug
router.patch('/bugs/:id', async (req, res) => {
    try {
        const newBug = req.body;
        let id = req.params.id;

        Bug.findByIdAndUpdate(
            id,
            newBug,
            (err, updated) => {
                if (err) return res.status(404).send({message:"bug not updated"});  // if bug was not found
                res.status(200).send({message:"bug updated"});
            });
    } catch(err) {
        console.log(bug);
        res.status(400).send({message:"error"});
    }
});


// DELETE a bug
router.delete('/bugs/:id', async (req, res) => {
    try {
        let id = req.params.id;

        Bug.findByIdAndDelete(
            id,
            (err, deleted) => {
                if (err) return res.status(400).send({message:"bug not deleted"});
                
                if (deleted === null) return res.status(404).send({message:"bug not found"});
                
                res.status(200).send({message:"bug deleted"});
            }
        )

    } catch(err) {
        console.log(bug);
        res.status(400).send({message:"error"});
    }
})

module.exports = router;

