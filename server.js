import express from "express";
import dotenv from "dotenv";


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Ecommerce con MongoDB");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

