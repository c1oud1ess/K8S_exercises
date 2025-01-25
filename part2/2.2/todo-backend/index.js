const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// const dir = path.join('./');
// app.use(express.static(dir));

var cors = require('cors')
app.use(cors())

const port = 3001;

todoList = {
  todos: ["TODO 1", "TODO 2", "TODO 3"]
};

app.get('/', (req, res)  => {
  res.status(200).send("Backend");
});

app.get('/todos', (req, res)  => {
  res.status(200).send(todoList.todos);
});

app.post('/todo', jsonParser, (req, res) => {
  console.log(req.body.value, "to be added");
  todoList.todos.push(req.body.value);
  res.status(200).send({ message: "Added", todos: todoList.todos });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
