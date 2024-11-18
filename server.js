const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// Import the Fruit model
const Session = require("./models/session.js");
app.use(express.urlencoded({ extended: false }));

// GET /build a route to the landing page 
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /sessions
app.get("/sessions", async (req,res) => {
    const allSessions = await Session.find();
    // const allSessionsSorted = await allSessions.sort((a, b) => b.date - a.date);
    res.render("sessions/index.ejs", {sessions: allSessions})
})

// GET /sessions/new
app.get("/sessions/new", (req, res) => {
    res.render("sessions/new.ejs");
  });

app.get("/sessions/:sessionId", async (req, res) => {
    const foundSession = await Session.findById(req.params.sessionId)
    res.render("sessions/show.ejs", {session: foundSession})
})

// POST /sessions
app.post("/sessions", async (req, res) => {
    if (req.body.wasFun === "on") {
        req.body.wasFun = true;
      } else {
        req.body.wasFun = false;
      }
      await Session.create(req.body);
    res.redirect("/sessions");
  });


app.listen(3000, () => {
  console.log("Listening on port 3000");
});