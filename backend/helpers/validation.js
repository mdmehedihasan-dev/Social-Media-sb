const Users = require("../models/userModel")


// email validate function 
exports.validateEmail =(email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

// name length check function 
exports.validateLength = (text,min,max)=>{
    if(text.length < min || text.length > max ){
        return false
    }
    else {
        return true
    }
        
}

// user name validate function 
exports.validateUsername = async(username)=>{
    let isTrue = false;
    do{
        const user = await Users.findOne({username})
         if(user){
            username += (+new Date() * Math.random()).toString().substring(0,1)
            isTrue = true
         }else{
            isTrue = false
         }
    }while(isTrue)

    return username
}










