const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateShortId(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ msg: "url is Required" })
    const shortID = shortid();
    await URL.create({
        shortUrl: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    res.status(200).json({ id: shortID })
}

module.exports = {
    handleGenerateShortId,
}