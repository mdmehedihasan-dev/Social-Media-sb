const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema;

const ResetCode = new mongoose.Schema({
    code:{
        type:String,
        require:true
    },
    user:{
        type:ObjectId,
        ref:"usermodel",
        require:true
    }
})

module.exports = mongoose.model("Code", ResetCode)