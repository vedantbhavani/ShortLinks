const express = require('express')
const {handleGenerateShortId } = require("../constrollers/url")
const router = express.Router()

router.post("/" , handleGenerateShortId)

module.exports = router;