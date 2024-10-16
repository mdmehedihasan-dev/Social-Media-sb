const express = require("express");
const { uploadImages } = require("../../controllers/uploadController");
const uploadMiddleware = require("../../middleware/uploadMiddleware");
const router = express.Router();

router.post("/uploadimage", uploadMiddleware, uploadImages);

module.exports = router;
