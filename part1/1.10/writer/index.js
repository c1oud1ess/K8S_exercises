const fs = require("fs")
const path = require("path")

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'time.txt')

// const filePath = 'C:/Users/zzh/Desktop/CSM/K8S/part1/Log_Output2/time.txt'

//const randomString = crypto.randomBytes(10).toString('hex')
let currentTimestamp = null
// let currentRandomString = null

try {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
        console.log(`Directory created: ${directory}`);
    } else {
        console.log(`Directory already exists: ${directory}`);
    }
} catch (err) {
    console.error(`Error creating directory: ${err}`);
}


const Write = () => {
    currentTimestamp = new Date().toISOString()
    // currentRandomString = crypto.randomBytes(10).toString('hex')
    console.log(`${currentTimestamp}`)
    fs.writeFile(filePath, currentTimestamp.toString(), err => {
        if (err) {
            console.error(err);
        }
    });

    setTimeout(Write, 5000)
}

Write()
