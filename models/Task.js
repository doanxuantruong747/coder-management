const mongoose = require("mongoose");
//Create schema 
const taskSchema = mongoose.Schema(
    {
        taskName: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ["pending", "working", "review", "done", "archive"] },
        isDeleted: { type: Boolean, enum: [true, false], default: false },
        referenceTo: { type: mongoose.SchemaTypes.ObjectId, ref: "User" } //one to one optional
    },
    {
        timestamps: true,
    }
);
//Create and export model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;