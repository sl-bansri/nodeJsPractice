const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const routes = require("./routes");

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
