const mongoose = require("mongoose");
const { Schema } = mongoose;

const bugSchema = new Schema({
    title: String,
    description: String,
    solved: Boolean,
    userid: String
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;

