const express = require('express')
const app = express()
const port = 8000;
const router = require('./routes/url')
const URL = require('./models/url')
const { connectMongo } = require('./connection');

app.use(express.json())
app.use('/url', router)

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOneAndUpdate({
        shortUrl:shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(result.redirectURL)
})

connectMongo("mongodb://127.0.0.1:27017/shortId").then(() => {
    console.log("MongoDB Connectd");
}).catch((err) => console.log("Error in Connection", err))

app.listen(port, () => {
    console.log(`Server running on : http://localhost:${port}`);
})