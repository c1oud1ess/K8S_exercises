import express from "express";
const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3000;
const directory = 'C:/Users/zzh/Desktop/CSM/K8S/part1/Project/'
// const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, "timestamp.txt")
const imagePath = path.join(directory, "image.png")

const downloadImage = async () => {
  try {
    const url = "https://picsum.photos/1200";
    const response = await axios.get(url, { responseType: 'stream' });
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    console.log("Image download complete.");
  } catch (err) {
    console.error("Error downloading image:", err);
    throw err;  
  }
};


app.get("/", async (req, res) => {
  try {
    const currentTimestamp = Date.now();
    let content;
    try {
      content = await fs.readFile(filePath, "utf8");
    } catch (err) {
      content = null;
    }

    if (!content || isNaN(parseInt(content)) || currentTimestamp - parseInt(content) > 60 * 60 * 1000) {
      await fs.writeFile(filePath, currentTimestamp.toString());
      console.log("Updated timestamp file with new timestamp.");
      await downloadImage();
    }

    res.status(200).sendFile(path.resolve(imagePath));
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
