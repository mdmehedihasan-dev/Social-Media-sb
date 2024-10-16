const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const cors = require("cors")
const fileUpload = require('express-fileupload')
const router = require("./routes")
const {dbConnection} = require("./database/dbConfig")

// database connection 
dbConnection()

// express and middleware 
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true
}))
app.use(router)



const PORT  = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server listening on PORT: ${PORT}`)
})