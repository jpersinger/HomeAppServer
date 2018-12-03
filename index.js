const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

console.log(process.env.REDISTOGO_URL, process.env);

app.get("/recipes", (req, res) => {
  res.json({ recipes: process.env.REDISTOGO_URL });
});

app.listen(port);
