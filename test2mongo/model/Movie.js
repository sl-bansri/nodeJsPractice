const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: Array,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  boxOffice: {
    type: Number,
    required: true,
  },
  cast: {
    type: Array,
    required: true,
  },
});

const movieData = mongoose.model("Movie", movieSchema);

module.exports = {
  movieData,
};
