// const getHashNow = () => {
//   const randomHash = Math.random().toString(36).substr(2, 6)

//   console.log(randomHash)

//   setTimeout(getHashNow, 5000)
// }

// getHashNow()
const crypto = require('crypto');

const randomString = crypto.randomBytes(10).toString('hex')

const logOutput = () => {
    const timestamp = new Date().toISOString()
    console.log(`${timestamp} : ${randomString}`)

    setTimeout(logOutput, 5000)
}

logOutput()