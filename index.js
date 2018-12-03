const express = require("express");
const app = express();

app.get("/recipes", (req, res) => {
  res.json({ recipes: "recipe" });
});

app.listen();
