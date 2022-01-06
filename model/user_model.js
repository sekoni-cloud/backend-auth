const mongoose = require('mongoose')
var schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String
    },
    roles:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
})

const Userdb = mongoose.model('Userdb',schema);


module.exports= Userdb;