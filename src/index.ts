import BlueBirdPromise from "bluebird";
import bodyParser from "body-parser";
import express from "express";
import { isEmpty } from "lodash";
import {
  GENERAL_BUDGET_BRYAN_CREDIT_URL,
  GENERAL_BUDGET_JULIE_CREDIT_URL,
  GENERAL_BUDGET_POST_URL,
  GENERAL_BUDGET_URL,
  INCOME_URL,
  MESSAGES_URL,
  MONTHLY_EXPENSES_URL,
  PIGGY_BANKS_URL,
  RECIPE_HASH,
  SETTINGS_HASH
} from "./constants";
import {
  addIncome,
  addMonthlyExpense,
  addPiggyBank,
  deleteIncome,
  deleteMonthlyExpense,
  deletePiggyBank,
  getGeneralBudget,
  getIncomes,
  getMonthlyExpenses,
  getPiggyBanks,
  updateCreditCard,
  updateGeneralBudget
} from "./services/database/budget";
import { addMessage, getMessages } from "./services/database/home";
import {
  addNewUser,
  getUserDataByEmail,
  getUserDataById
} from "./services/database/settings";
const { getRecipes, addRecipe } = require("./services/database/recipes");
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, X-Auth-Token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");

  // updatePiggyBanks();

  next();
});

const sendData = (res, getData: () => BlueBirdPromise<any[]>) => {
  getData()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({ err });
    });
};

// HOME
app.post(MESSAGES_URL, (req, res) => {
  addMessage(req.body);
});

app.get(MESSAGES_URL, (req, res) => {
  sendData(res, getMessages);
});

// RECIPES
app.post(RECIPE_HASH, (req, res) => {
  addRecipe(req.body);
});

app.get(RECIPE_HASH, (req, res) => {
  sendData(res, getRecipes);
});

// BUDGET

// GENERAL INFO
app.post(GENERAL_BUDGET_POST_URL, (req, res) => {
  updateGeneralBudget(req.body.amount);
});

app.post(GENERAL_BUDGET_JULIE_CREDIT_URL, (req, res) => {
  updateCreditCard("Julie", req.body.amount);
});

app.post(GENERAL_BUDGET_BRYAN_CREDIT_URL, (req, res) => {
  updateCreditCard("Bryan", req.body.amount);
});

app.get(GENERAL_BUDGET_URL, (req, res) => {
  sendData(res, getGeneralBudget);
});

// MONTHLY EXPENSES
app.post(MONTHLY_EXPENSES_URL, (req, res) => {
  addMonthlyExpense(req.body);
});

app.delete(MONTHLY_EXPENSES_URL, (req, res) => {
  deleteMonthlyExpense(req.query.title);
});

app.get(MONTHLY_EXPENSES_URL, (req, res) => {
  sendData(res, getMonthlyExpenses);
});

// PIGGY BANKS
app.post(PIGGY_BANKS_URL, (req, res) => {
  addPiggyBank(req.body);
});

app.delete(PIGGY_BANKS_URL, (req, res) => {
  deletePiggyBank(req.query.title);
});

app.get(PIGGY_BANKS_URL, (req, res) => {
  sendData(res, getPiggyBanks);
});

// INCOMES
app.post(INCOME_URL, (req, res) => {
  addIncome(req.body);
});

app.delete(INCOME_URL, (req, res) => {
  deleteIncome(req.query.id);
});

app.get(INCOME_URL, (req, res) => {
  sendData(res, getIncomes);
});

app.get("/test", (req, res) => {
  res.send(process.env.GOOGLE_CLIENT_ID);
});

// SETTINGS
app.post(SETTINGS_HASH, (req, res) => {
  addNewUser(req.body);
});

app.get(SETTINGS_HASH, (req, res) => {
  const { id, email } = JSON.parse(req.query.user);
  console.log("req", id, email);
  if (!id && !email) {
    res.send({});
    return;
  }

  getUserDataById(id).then(dataFromId => {
    if (!isEmpty(dataFromId)) {
      res.send(dataFromId);
    }

    getUserDataByEmail(email).then(dataFromEmail => {
      res.send(dataFromEmail);
    });
  });
});

app.listen(port);
