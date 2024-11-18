const express = require("express");

const app = express();

// GET /build a route to the landing page 
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});