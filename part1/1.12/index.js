const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 3000;

// const directory = 'C:/Users/zzh/Desktop/CSM/K8S/part1/Project/';
const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "timestamp.txt");
const imagePath = path.join(directory, "image.png");

const downloadImage = async () => {
  try {
    const url = "https://picsum.photos/1200";
    const response = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    console.log("Image download complete.");
  } catch (err) {
    console.error("Error downloading image:", err);
    throw err;
  }
};

app.get("/", (req, res) => {
    const currentTimestamp = Date.now();
  
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        content = null;
      }
  
      if (!content || isNaN(parseInt(content)) || currentTimestamp - parseInt(content) > 60 * 60 * 1000) {
        fs.writeFile(filePath, currentTimestamp.toString(), (err) => {
          if (err) {
            console.error("Error writing timestamp file:", err);
            return res.status(500).send("Server error");
          }
          console.log("Updated timestamp file with new timestamp.");
          downloadImage()
            .then(() => res.status(200).sendFile(path.resolve(imagePath)))
            .catch((err) => {
              console.error("Error downloading image:", err);
              res.status(500).send("Server error");
            });
        });
      } else {
        res.status(200).sendFile(path.resolve(imagePath));
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
