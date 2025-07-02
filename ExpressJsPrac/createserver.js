// example for sending simple static message in browser

// const express = require("express");
// const app = express();
// const path = require("path");
// const PORT = process.env.PORT || 5173;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// example for sending file in browser

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  // or
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// or
// app.get("^/$|/index(.html)", (req, res) => {
//   // res.sendFile("./views/index.html", { root: __dirname });
//   // or
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// or

app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page.html", (req, res) => {
  res.redirect(301, "/new-page.html"); // 302 will be given by default
});

// Route Handler

app.get(
  "/hello.html",
  (req, res, next) => {
    console.log("ATTEMP TO LOAD HTML ");
    next();
  },
  (req, res) => {
    // here we can also pass next if this is not last function
    res.send("Hello World!");
  }
);

// chain routing

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("fineshed");
};

app.get("/chain.html", [one, two, three]);

app.get("/{*any}", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
