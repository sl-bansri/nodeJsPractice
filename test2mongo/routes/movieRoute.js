const express = require("express");
const {
  getMovieData,
  getMovie,
  newMovie,
} = require("../controller/movieControllers");
const router = express.Router();

router.get("/info", getMovieData);
router.get("/", getMovie);
router.post("/", newMovie);

module.exports = router;
