import BlueBirdPromise from "bluebird";
import bodyParser from "body-parser";
import express from "express";
import {
  DISPLAY_NAME_URL,
  GENERAL_BUDGET_BRYAN_CREDIT_URL,
  GENERAL_BUDGET_JULIE_CREDIT_URL,
  GENERAL_BUDGET_POST_URL,
  GENERAL_BUDGET_URL,
  INCOME_URL,
  LINKED_EMAILS_URL,
  MESSAGES_URL,
  MONTHLY_EXPENSES_URL,
  PIGGY_BANKS_URL,
  PUSH_NOTIFICATIONS_URL,
  RECIPE_HASH,
  SETTINGS_HASH,
  TEXT_COLOR_URL
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
  getUser,
  updateDisplayName,
  updateLinkedEmails,
  updatePushNotificationsEnabled,
  updateTextColor
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

app.post(DISPLAY_NAME_URL, (req, res) => {
  const { id, displayName } = req.body;
  updateDisplayName(id, displayName);
});

app.post(TEXT_COLOR_URL, (req, res) => {
  const { id, textColor } = req.body;
  updateTextColor(id, textColor);
});

app.post(LINKED_EMAILS_URL, (req, res) => {
  const { id, linkedEmails } = req.body;
  updateLinkedEmails(id, linkedEmails);
});

app.post(PUSH_NOTIFICATIONS_URL, (req, res) => {
  const { id, pushNotificationsEnabled } = req.body;
  updatePushNotificationsEnabled(id, pushNotificationsEnabled);
});

app.get(SETTINGS_HASH, (req, res) => {
  console.log(req.query);
  getUser(JSON.parse(req.query.user))
    .then(data => {
      res.send(data);
    })
    .catch(err => res.send({ err }));
});

app.listen(port);
