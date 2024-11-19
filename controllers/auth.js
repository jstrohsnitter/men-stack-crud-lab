const User = require("../models/login.js")
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/sign-up", (req,res) => {
    res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req,res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
    return res.send("Username already taken.");
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
      }
    res.send("Form submission accepted!")
})