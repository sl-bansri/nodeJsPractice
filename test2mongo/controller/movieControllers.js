const { movieData } = require("../model/Movie");

const getMovie = async (req, res) => {
  const movie = await movieData.find();
  console.log(movie);
  if (movie.length == 0) {
    return res.json({ message: "list is empty create your movie first" });
  }
  if (!movie) return res.status(204).json({ message: "No movie found." });
  res.json(movie);
};

const newMovie = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.genre ||
      !req.body.year ||
      !req.body.rating ||
      !req.body.director ||
      !req.body.duration ||
      !req.body.boxOffice ||
      !req.body.cast
    ) {
      res.json({ message: " not valid Data " });
    }
    const newMovie = new movieData({
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      rating: req.body.rating,
      director: req.body.director,
      duration: req.body.duration,
      boxOffice: req.body.boxOffice,
      cast: req.body.cast,
    });

    const savedData = await newMovie.save();

    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error in adding new Order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMovieData = async (req, res) => {
  try {
    const pipeline = [
      // ALL MOVIES RELEASED AFTER 2010
      //   {
      //     $match: {
      //       year: { $gt: 2010 },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: 1,
      //       year: 1,
      //     },
      //   },
      //  average rating pr genre
      //   {
      //     $unwind: "$genre",
      //   },
      //   {
      //     $group: {
      //       _id: "$genre",
      //       averageRating: { $avg: "$rating" },
      //     },
      //   },
      //   {
      //     $sort: { averageRating: -1 },
      //   },
      // top 1 highest rating movie
      //   {
      //     $group: {
      //       _id: "$title",
      //       averageRating: { $avg: "$rating" },
      //     },
      //   },
      //   {
      //     $sort: { averageRating: -1 },
      //   },
      //   {
      //     $limit: 1,
      //   },
      // Total box office collection by director
      //   {
      //     $unwind: "$director",
      //   },
      //   {
      //     $group: {
      //       _id: "$director",
      //       boxOfficCollection: { $sum: "$boxOffice" },
      //     },
      //   },
      //   {
      //     $sort: { boxOfficCollection: -1 },
      //   },
      //List all unique actors who have worked in a Sci-Fi movie

      //   {
      //     $project: {
      //       _id: 1,
      //       title: 1,
      //       getSCI_FI: {
      //         $filter: {
      //           input: "$genre",
      //           as: "genre",
      //           cond: { $gte: ["$$genre", "Sci-Fi"] },
      //         },
      //       },
      //     },
      //   },

      // Classify movies into categories based on duration

      {
        $addFields: {
          movieDuration: {
            $cond: {
              if: { $gte: ["$duration", 198] },
              then: "high",
              else: "medium",
            },
          },
        },
      },
      {
        $project: {
          title: 1,
          movieDuration: 1,
        },
      },
    ];
    const userMovie = await movieData.aggregate(pipeline);

    res.json(userMovie);
  } catch (error) {
    console.error("Error in aggregate data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getMovie,
  newMovie,
  getMovieData,
};
