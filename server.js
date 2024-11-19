//add code for sorting list by date
//log in
//style

const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// Import the Fruit model
const Session = require("./models/session.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// GET /build a route to the landing page 
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /sessions
app.get("/sessions", async (req,res) => {
    const allSessions = await Session.find();
    const allSessionsSorted = await allSessions.sort((a, b) => new Date(b.date) - new Date(a.date)); //got help from stack overflow with this one. the Date creates a string out of a,b.date. the new turns it into an object. the date alone is a utility function, and spits out the current date and time.  with the new operator, the date turns into a constructor function, and converts the a.date and b.date strings into objects to be sorted 
    console.log(allSessionsSorted)
    res.render("sessions/index.ejs", {sessions: allSessionsSorted})
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

  app.delete("/sessions/:sessionId", async (req, res) => {
    await Session.findByIdAndDelete(req.params.sessionId)
    res.redirect("/sessions");
  });

// GET localhost:3000/sessions/:sessionId/edit
app.get("/sessions/:sessionId/edit", async (req, res) => {
    const foundSession2 = await Session.findById(req.params.sessionId);
    res.render("sessions/edit.ejs", {
        session: foundSession2,
    });
  });

  app.put("/sessions/:sessionId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.wasFun === "on") {
      req.body.wasFun = true;
    } else {
      req.body.wasFun = false;
    }
    
    // Update the session in the database
    await Session.findByIdAndUpdate(req.params.sessionId, req.body);
  
    // Redirect to the session's show page to see the updates
    res.redirect(`/sessions/${req.params.sessionId}`);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});