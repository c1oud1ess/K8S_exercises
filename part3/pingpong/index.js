const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

let pongs = 0;

app.get("/pingpong", (req, res) => {
    pongs += 1;
    res.status(200).send("pong: " + pongs);
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});