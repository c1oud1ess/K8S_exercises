const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const cors = require("cors");
const { Client } = require("pg");

const port = process.env.PORT || 3001;
let client;

const connectDatabase = async () => {
    client = new Client({
        host: "db-svc",
        user: "postgres",
        database: "postgres",
        password: process.env.POSTGRES_PASSWORD.toString(),
        port: 5432,
    });
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error.stack);
    }
};

const executeQuery = async (query) => {
    try {
        await client.query(query);
        console.log("Query executed successfully");
    } catch (error) {
        console.error("Error executing query:", error.stack);
    }
};

const initDatabase = async () => {
    try {
        await executeQuery(`CREATE TABLE IF NOT EXISTS "pongs" (
            name VARCHAR(30) NOT NULL,
            count INT NOT NULL,
            PRIMARY KEY (name)
        );`);
        await executeQuery(`INSERT INTO pongs (name, count) 
            VALUES('pongcount', 0) 
            ON CONFLICT DO NOTHING;`);
        console.log("Database initialized");
    } catch (error) {
        console.error("Error initializing database:", error.stack);
    }
};

app.use(express.json());
app.use(cors());

// Get current count of pongs
app.get("/pingpong", async (req, res) => {
    try {
        const result = await client.query("SELECT count FROM pongs WHERE name = 'pongcount';");
        const count = result.rows[0]?.count || 0;
        console.log("Count:", count);
        res.status(200).send("pongs: " + count);
    } catch (error) {
        console.error("Error fetching count:", error.stack);
        res.status(500).send("Error fetching count");
    }
});

// Increment the pong count
app.get("/add", async (req, res) => {
    try {
        await client.query("UPDATE pongs SET count = count + 1 WHERE name = 'pongcount';");
        console.log("Added one pong.");
        res.send("Success!");
    } catch (error) {
        console.error("Error updating count:", error.stack);
        res.status(500).send("Error updating count");
    }
});

// Initialize the database when the server starts
connectDatabase().then(() => initDatabase());

app.listen(port, () => {
    console.log("Server started on port " + port);
});
