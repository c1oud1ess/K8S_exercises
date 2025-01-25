const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const randomHash = crypto.randomBytes(10).toString('hex')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'time.txt')
// const filePath = 'C:/Users/zzh/Desktop/CSM/K8S/part1/Log_Output2/time.txt'

app.get('/', (req, res) => {
    const timestamp = fs.readFileSync(filePath, 'utf8')
    if (randomHash && timestamp) {
        res.json({
            timestamp,
            randomHash,
        });
    } else {
        res.status(503).send('Service fails.')
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});