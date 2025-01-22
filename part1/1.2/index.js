// const express = require('express');
// const app = express();

//  PORT 3000
const port = process.env.PORT || 3000;

const logPort = () => {
    console.log(`Server started in port ${port}`);
}

logPort()