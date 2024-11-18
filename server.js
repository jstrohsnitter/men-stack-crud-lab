const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// GET /build a route to the landing page 
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});