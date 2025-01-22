const crypto = require('crypto')
const fs = require("fs")
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pongs.txt')

//const randomString = crypto.randomBytes(10).toString('hex')
let currentTimestamp = null
let currentRandomString = null

const logOutput = () => {
    currentTimestamp = new Date().toISOString()
    currentRandomString = crypto.randomBytes(10).toString('hex')
    console.log(`${currentTimestamp} : ${currentRandomString}`)

    setTimeout(logOutput, 5000)
}

app.get('/', (req, res) => {
    const pongs = fs.readFileSync(filePath, 'utf8')
    if (currentTimestamp && currentRandomString) {
        res.json({
            currentTimestamp,
            currentRandomString,
            'Ping / Pongs' : pongs
        });
    } else {
        res.status(503).send('Service fails.')
    }
});

logOutput()

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});