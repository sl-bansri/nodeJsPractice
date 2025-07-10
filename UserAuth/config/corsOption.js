const allowedOrigins = require("./allowedOrigin");

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // if domain is present in whitelist then proceed
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  originSuccessStatus: 200,
};

module.exports = corsOption;
