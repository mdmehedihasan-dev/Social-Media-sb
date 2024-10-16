const express = require("express")
const router = express.Router()
const auth = require("./auth.js")
const allPost = require("./post.js")
const upload = require("./upload.js")


router.use('/auth',auth)
router.use('/posts',allPost)
router.use('/upload',upload)



module.exports = router;