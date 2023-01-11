const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ "message": "Hola, API is running :)" });
});

app.get("/buckets", (req, res) => {
  console.log("Request Arrived: GET");
  fs.readFile("./buckets.json", "utf-8", (err, data) => {
    if (err) res.status(400).json({ "message": "Error occured while reading buckets.json file." });
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData.buckets);
  });
});

app.post("/buckets", (req, res) => {
  console.log("Request Arrived: POST");
  console.log("buckets: ", req.body.buckets);
  if (req.body.buckets === null || req.body.buckets === undefined) {
    res.send(400).json({ "message": "No buckets parameter in body." });
  }
  fs.writeFile("./buckets.json", JSON.stringify(req.body), "utf-8", (err) => {
    if (err) res.status(400).json({ "message": "Error occured while writing bubkets.json file." });
    res.status(200).json(req.body);
  });
});

app.listen(port, () => console.log(`Server running on PORT: ${port}`));