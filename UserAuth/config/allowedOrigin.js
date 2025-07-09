const allowedOrigins = [
  "http://www.google.com", // your own host link
  "http://127.0.0.1:5500",
  "http://localhost:3500",
]; // here we have to store the domain to whome you want to give access

module.exports = allowedOrigins;
