const mongoose = require("mongoose")

exports.dbConnection =()=>{
    mongoose.connect(process.env.MONGODB_URL).then(
        console.log("Database Connection Successfully✌️")
    )
}