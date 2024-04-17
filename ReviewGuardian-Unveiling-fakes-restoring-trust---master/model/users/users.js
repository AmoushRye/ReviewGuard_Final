const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        history: [{ type: mongoose.Schema.Types.ObjectId, ref:"History" }],
    },
    {
        timestamps: true,
    }
);

//compile the schema to form a model
const User = mongoose.model("User", userSchema);
module.exports = User;