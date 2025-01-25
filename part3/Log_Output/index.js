// const getHashNow = () => {
//   const randomHash = Math.random().toString(36).substr(2, 6)

//   console.log(randomHash)

//   setTimeout(getHashNow, 5000)
// }

// getHashNow()
const crypto = require('crypto')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//const randomString = crypto.randomBytes(10).toString('hex')
let currentTimestamp = null
let currentRandomHash = null

const logOutput = () => {
    currentTimestamp = new Date().toISOString()
    currentRandomHash = crypto.randomBytes(10).toString('hex')
    console.log(`${currentTimestamp} : ${currentRandomHash}`)

    setTimeout(logOutput, 5000)
}

app.get('/currentstatus', (req, res) => {
    if (currentTimestamp && currentRandomHash) {
        res.json({
            timestamp: currentTimestamp,
            randomHash: currentRandomHash,
        });
    } else {
        res.status(503).send('Service fails.')
    }
});

logOutput()

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});