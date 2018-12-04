// const express = require("express");
import bodyParser from "body-parser";
import express from "express";
import {
  INCOME_URL,
  MONTHLY_EXPENSES_URL,
  PIGGY_BANKS_URL,
  RECIPE_HASH
} from "./constants";
import {
  addIncome,
  addMonthlyExpense,
  addPiggyBank,
  deleteIncome,
  deleteMonthlyExpense,
  deletePiggyBank,
  getIncomes,
  getMonthlyExpenses,
  getPiggyBanks
} from "./services/database/budget";
const { getRecipes, addRecipe } = require("./services/database/recipes");
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");

  // updatePiggyBanks();

  next();
});

// RECIPES
app.post(RECIPE_HASH, (req, res) => {
  addRecipe(req.body);
});

app.get(RECIPE_HASH, (req, res) => {
  getRecipes()
    .then(recipes => {
      res.send({ recipes });
    })
    .catch(err => {
      res.send({ err });
    });
});

// BUDGET

// MONTHLY EXPENSES
app.post(MONTHLY_EXPENSES_URL, (req, res) => {
  addMonthlyExpense(req.body);
});

app.delete(MONTHLY_EXPENSES_URL, (req, res) => {
  deleteMonthlyExpense(req.query.title);
});

app.get(MONTHLY_EXPENSES_URL, (req, res) => {
  getMonthlyExpenses()
    .then(monthlyExpenses => {
      res.send(monthlyExpenses);
    })
    .catch(err => {
      res.send({ err });
    });
});

// PIGGY BANKS
app.post(PIGGY_BANKS_URL, (req, res) => {
  addPiggyBank(req.body);
});

app.delete(PIGGY_BANKS_URL, (req, res) => {
  deletePiggyBank(req.query.title);
});

app.get(PIGGY_BANKS_URL, (req, res) => {
  getPiggyBanks()
    .then(piggyBanks => {
      res.send(piggyBanks);
    })
    .catch(err => {
      res.send({ err });
    });
});

// INCOMES
app.post(INCOME_URL, (req, res) => {
  addIncome(req.body);
});

app.delete(INCOME_URL, (req, res) => {
  deleteIncome(req.query.id);
});

app.get(INCOME_URL, (req, res) => {
  getIncomes()
    .then(incomes => {
      res.send(incomes);
    })
    .catch(err => {
      res.send({ err });
    });
});

app.listen(port);
