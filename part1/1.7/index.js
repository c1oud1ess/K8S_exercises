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
let currentRandomString = null

const logOutput = () => {
    currentTimestamp = new Date().toISOString()
    currentRandomString = crypto.randomBytes(10).toString('hex')
    console.log(`${currentTimestamp} : ${currentRandomString}`)

    setTimeout(logOutput, 5000)
}

app.get('/currentstatus', (req, res) => {
    if (currentTimestamp && currentRandomString) {
        res.json({
            timestamp: currentTimestamp,
            randomString: currentRandomString,
        });
    } else {
        res.status(503).send('Service fails.')
    }
});

logOutput()

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});