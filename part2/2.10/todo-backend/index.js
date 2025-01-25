const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require("pg");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;
let client;

const connectDatabase = async () => {
  client = new Client({
    host: "db-svc",
    user: "postgres",
    database: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  });
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.stack);
  }
};

const initDatabase = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255) NOT NULL
      );
    `);
    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing database:", error.stack);
  }
};

app.get('/todos', async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM todos;");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching todos:", error.stack);
    res.status(500).send("Error fetching todos");
  }
});

app.post('/todo', async (req, res) => {
  const { content } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).send("Invalid content");
  }

  if (content.length > 140) {
    return res.status(400).send("Content length cannot exceed 140 characters");
  }

  try {
    await client.query("INSERT INTO todos (content) VALUES ($1);", [content]);
    console.log(`Added todo: ${content}`);
    const result = await client.query("SELECT * FROM todos;");
    res.status(200).json({ message: "Todo added", todos: result.rows });
  } catch (error) {
    console.error("Error adding todo:", error.stack);
    res.status(500).send("Error adding todo");
  }
});


connectDatabase().then(() => initDatabase());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
