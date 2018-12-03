const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

app.get("/recipes", (req, res) => {
  res.json({ recipes: "recipe" });
});

app.listen(port);
