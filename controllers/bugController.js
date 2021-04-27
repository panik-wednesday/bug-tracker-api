const express = require("express");
const router = express.Router();
const Bug = require("../models/bug.js");
const auth = require("../middleware/auth.js");

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteBug
};

// RETRIEVE all bugs
async function getAll(req, res) {
    try{
        await req.user.populate("bugs").execPopulate();
        res.status(200).send(req.user.bugs);
    } catch(err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}


// RETRIEVE a specific bug
async function getOne(req, res) {
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
}

// CREATE a bug
async function create(req, res) {
    try{
        const bug = new Bug({...req.body, user:req.user.id});
        await bug.save();
        res.status(201).send(bug);

    } catch(err) {
        console.log(err);
        res.status(400).send({message:"error"});
    }
}

// UPDATE a bug
async function update(req, res) {
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
}


// DELETE a bug
async function deleteBug(req, res) {
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
}

