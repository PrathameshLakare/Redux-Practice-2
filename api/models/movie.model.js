const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;
