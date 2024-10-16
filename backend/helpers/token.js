const jwt = require("jsonwebtoken")

exports.jwToken = (userId,expiredIn)=>{
    return jwt.sign(userId,process.env.JWT_SECRET,{
        expiresIn:expiredIn
    })

}