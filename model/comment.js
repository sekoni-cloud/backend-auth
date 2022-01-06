const mongoose = require("mongoose")

const Comments = mongoose.model(
    "Comments",
    new mongoose.Schema({
        text : String,
        createdAt : Date
    })
)

module.exports = Comments