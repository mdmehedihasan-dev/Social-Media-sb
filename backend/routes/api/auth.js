const express = require("express")
const router = express.Router()
const {newUser, verifiedUser, login,resetCode, reVerification,changePassword, findUser, verifyCode} = require("../../controllers/userController")
const { authUser } = require("../../middleware/auth")

router.post('/',newUser)
router.post('/activate',authUser,verifiedUser)
router.post('/login',login)
router.post('/reverification',authUser,reVerification)
router.post('/resetpassword',findUser)
router.post('/resetcode',resetCode)
router.post('/verifyresetcode',verifyCode)
router.post('/changepassword',changePassword)




module.exports = router;