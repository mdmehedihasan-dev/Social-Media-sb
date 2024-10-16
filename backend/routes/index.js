const express = require("express")
const router = express.Router()
const api = require("./api")

const baseApi = process.env.BASE_API_URL

router.use(baseApi,api)

module.exports = router;