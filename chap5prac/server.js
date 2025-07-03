const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const LogEvents = require("./LogEvents");
const EventsEmitter = require("events");

class Emitter extends EventsEmitter {}

// initiall object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(`${req.url} url , ${req.method} method`);

  let path;

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);
});

//   if (req.url === "/" || req.url === "index.html") {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/html");
//     path = path.join(__dirname, "views", "index.html");
//     fs.readFile(path, "utf8", (err, data) => {
//       res.end(data);
//     });
//   }

// OR

//   switch (req.url) {
//     case "/":
//       res.statusCode = 200;
//       res.setHeader("Content-Type", "text/html");
//       path = path.join(__dirname, "views", "index.html");
//       fs.readFile(path, "utf8", (err, data) => {
//         res.end(data);
//       });
//       break;
//   }

// OR

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
