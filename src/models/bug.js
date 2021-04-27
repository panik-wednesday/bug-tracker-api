const mongoose = require("mongoose");
const { Schema } = mongoose;

const bugSchema = new Schema({
    title: String,
    description: String,
    solved: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});

const Bug = mongoose.model("Bug", bugSchema);

module.exports = Bug;

