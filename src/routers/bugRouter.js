const express = require("express");
const router = express.Router();
const Bug = require("../models/bug.js");
const auth = require("../middleware/auth.js");

const app = express();

// RETRIEVE all bugs
router.get('/bugs', auth, async (req, res) => {
    try{
        // get all bugs for the current user
        let bugs = await Bug.find({userid: req.user._id});

        res.status(200).send(bugs);

    } catch(err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
});


// RETRIEVE a specific bug
router.get('/bugs/:id', auth, async (req, res) => {
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
router.post('/bugs', auth, async (req, res) => {
    try{
        const bug = new Bug({
            title: req.body.title,
            description: req.body.description,
            solved: req.body.solved,
            userid: req.user._id
        });
        
    
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
router.patch('/bugs/:id', auth, async (req, res) => {
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
router.delete('/bugs/:id', auth, async (req, res) => {
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

