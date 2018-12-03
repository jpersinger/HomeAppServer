"use strict";
// const a = require("./services/database/index.ts");
var express = require("express");
// import express from "express";
// import { getRecipes } from "./services/database";
var getRecipes = require("./services/database").getRecipes;
var app = express();
var port = process.env.PORT || 3001;
app.get("/recipes", function (req, res) {
    res.json({ recipes: getRecipes() });
});
app.listen(port);
