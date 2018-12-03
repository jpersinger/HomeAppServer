// const express = require("express");
import bodyParser from "body-parser";
import express from "express";
const { getRecipes, addRecipe } = require("./services/database/recipes");
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.all("/recipes", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (!!req.body.title) {
    // Adding a new recipe
    addRecipe(req.body);
  } else {
    // Getting all recipes
    const recipeProm = getRecipes();
    recipeProm
      .then(recipes => {
        res.send({ recipes });
      })
      .catch(err => {
        res.send({ err });
      });
  }
});

app.listen(port);
