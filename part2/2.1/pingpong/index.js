const express = require("express")
const path = require('path');
const fs = require("fs")
const app = express()
const port = process.env.PORT || 3001;

// const directory = path.join('/', 'usr', 'src', 'app', 'files')
// const filePath = path.join(directory, 'pongs.txt')
// const filePath = 'C:/Users/zzh/Desktop/CSM/K8S/part1/mix/time.txt'

// try {
//     if (!fs.existsSync(directory)) {
//         fs.mkdirSync(directory, { recursive: true });
//         console.log(`Directory created: ${directory}`);
//     } else {
//         console.log(`Directory already exists: ${directory}`);
//     }
// } catch (err) {
//     console.error(`Error creating directory: ${err}`);
// }

let pongs = 0;

app.get("/pingpong", (req, res) => {
    pongs += 1;
    console.error(pongs);
    // fs.writeFile(filePath, pongs.toString(), err => {
    //     if (err) {
    //         console.error(err);
    //     }
    // });
    res.status(200).send("pongs: " + pongs);
});


app.listen(port, () => {
    console.log("Server started on port " + port);
});