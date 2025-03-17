const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    description: {type: String},
    location: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true}
    },
    radius: {type: Number, required: true},
    isCompleted: {type: Boolean, default: false}
},{timestamps: true});

module.exports = mongoose.model("Task", TaskSchema);