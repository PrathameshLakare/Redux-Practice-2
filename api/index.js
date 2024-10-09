const express = require("express");
const app = express();
const cors = require("cors");

const { initializeDatabase } = require("./db/db.connect");
const Movies = require("./models/movie.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movies.find();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/movies", async (req, res) => {
  try {
    const newMovie = new Movies(req.body);
    const savedMovie = await newMovie.save();

    if (savedMovie) {
      res.status(201).json(savedMovie);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/movies/:movieId", async (req, res) => {
  try {
    const updatedMovie = await Movies.findByIdAndUpdate(
      req.params.movieId,
      req.body,
      { new: true },
    );
    if (updatedMovie) {
      res.json({ message: "Movie updated successfully.", movie: updatedMovie });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/movies/:movieId", async (req, res) => {
  try {
    const deletedMovie = await Movies.findByIdAndDelete(req.params.movieId);
    if (deletedMovie) {
      res
        .status(200)
        .json({ message: "Movie delted successfully.", movie: deletedMovie });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
