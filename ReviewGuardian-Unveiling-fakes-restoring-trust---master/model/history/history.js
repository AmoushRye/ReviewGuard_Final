const mongoose = require("mongoose");

//Schema
const historySchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: true,
        },
        result: {
            type: String,
            //required: true,
        },
        date: {
            type: Date,
            //required: true,
        },
        time: {
            type: Date,
            //required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true,
    }
);

//compile the schema to form a model
const History = mongoose.model("History", historySchema);
module.exports = History;