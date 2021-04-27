const express = require("express");
const router = express.Router();
const Bug = require("../models/bug.js");

const app = express();

router.get('/bugs', (req, res) => {
    res.send("bugs");

});

router.post('/bugs', (req, res) => {
    const bug = new Bug({
        title: "Bug 1",
        description: "Sample bug number one",
        solved: false
    });

    bug.save((err, bug) => {
        if (err) return console.error(err);
        console.log("bug added to collection");
    })
});

module.exports = router;

