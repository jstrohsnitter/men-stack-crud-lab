const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    location: String,
    date: String,
    waveHeight: Number,
    wasFun: Boolean,
  });

  const Session = mongoose.model("Session", sessionSchema); // create model

  module.exports = Session;