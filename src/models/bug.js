const mongoose = require("mongoose");
const { Schema } = mongoose;

const bugSchema = new Schema({
    title: String,
    description: String,
    solved: Boolean,
    type: Schema.Types.ObjectId,
    ref:'User'
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;

