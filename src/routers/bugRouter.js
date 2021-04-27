const express = require("express");
const router = express.Router();
const Bug = require("../models/bug.js");

const app = express();

router.get('/bugs', async (req, res) => {
    try{
        let bugs = await Bug.find({});
        res.status(200).send(bugs);
    } catch(err) {
        res.status(400).send({message:"error"});
    }
});

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

module.exports = router;

