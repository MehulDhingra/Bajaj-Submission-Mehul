const express = require("express");
const bfhlRoutes = require("./routes/bfhl");

const app = express();

app.use(express.json());
app.use("/api", bfhlRoutes);

module.exports = app;
