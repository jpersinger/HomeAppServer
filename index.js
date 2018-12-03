import { getRecipes, setup } from "./services/redis";

const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

setup();

app.get("/recipes", (req, res) => {
  res.json({ recipes: getRecipes() });
});

app.listen(port);
