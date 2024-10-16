const express = require("express")
const router = express.Router()
const { createPost,getAllPosts } = require("../../controllers/postController");
const { authUser } = require("../../middleware/auth");

router.post('/createpost',authUser, createPost)
router.get('/getallposts',authUser, getAllPosts)






module.exports = router;