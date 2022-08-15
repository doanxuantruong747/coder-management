const mongoose = require("mongoose");
//Create schema
const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        roles: { type: String, enum: ["employee", "manager"], required: "employee" },
    },
    {
        timestamps: true,
    }
);

//Create and export model
const User = mongoose.model("User", userSchema);
module.exports = User;