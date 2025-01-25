const crypto = require('crypto')
// const fs = require("fs")
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const axios = require("axios");

// const directory = path.join('/', 'usr', 'src', 'app', 'files')
// const filePath = path.join(directory, 'pongs.txt')

//const randomString = crypto.randomBytes(10).toString('hex')
let currentTimestamp = null
let currentRandomString = null

const logOutput = () => {
    currentTimestamp = new Date().toISOString()
    currentRandomString = crypto.randomBytes(10).toString('hex')
    console.log(`${currentTimestamp} : ${currentRandomString}`)

    setTimeout(logOutput, 5000)
}

app.get('/', async (req, res) => {
    try {
        const response = await axios.get("http://pingpong-svc:2346/pingpong");

        const body = response.data;

        let pongs = body.match(/pongs:\s*(\d+)/);

        if (currentTimestamp && currentRandomString) {
            res.json({
                currentTimestamp,
                currentRandomString,
                'Ping / Pongs': pongs ? pongs[1] : null
            });
        } else {
            res.status(503).send('Service fails.');
        }
    } catch (err) {
        console.error("Error in request:", err);
        res.status(500).end("Failed to request");
    }
});

logOutput()

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});