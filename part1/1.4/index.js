// const express = require('express');
// const app = express();

//  PORT 3000
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(port, () => {
//   console.log(`Server started in port ${port}`);
// });

const logPort = () => {
    console.log(`Server started in port ${port}`);
}

logPort()