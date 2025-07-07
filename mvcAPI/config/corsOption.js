const whiteList = [
  "http://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
]; // here we have to store the domain to whome you want to give access

const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      // if domain is present in whitelist then proceed
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  originSuccessStatus: 200,
};

module.exports = corsOption;
