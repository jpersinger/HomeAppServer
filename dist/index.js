"use strict";
const express = require("express");
const { getRecipes } = require("./services/database/recipes");
const app = express();
const port = process.env.PORT || 3001;
app.get("/recipes", (req, res) => {
    const recipeProm = getRecipes();
    recipeProm
        .then(recipes => {
        console.log(recipes);
        res.json({ recipes });
    })
        .catch(err => {
        res.json({ err });
    });
});
app.listen(port);
