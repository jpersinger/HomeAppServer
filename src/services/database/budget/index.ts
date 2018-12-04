import BlueBirdPromise from "bluebird";
import moment from "moment";
import DatabaseHandler from "../";
import { Income, MonthlyExpense, PiggyBank } from "./budget.defintions";
import { INCOMES, MONTHLY_EXPENSES, PIGGY_BANKS } from "./constants";

export const addMonthlyExpense = (monthlyExpense: MonthlyExpense) => {
  DatabaseHandler.setHashValue(
    MONTHLY_EXPENSES,
    monthlyExpense.title,
    JSON.stringify(monthlyExpense)
  );
};

export const deleteMonthlyExpense = (title: string) => {
  DatabaseHandler.deleteValue(MONTHLY_EXPENSES, title);
};

export const getMonthlyExpenses = (): BlueBirdPromise<any[]> =>
  DatabaseHandler.getHashValues(MONTHLY_EXPENSES);

export const addPiggyBank = (piggyBank: PiggyBank) => {
  DatabaseHandler.setHashValue(
    PIGGY_BANKS,
    piggyBank.title,
    JSON.stringify(piggyBank)
  );
};

export const deletePiggyBank = (title: string) => {
  DatabaseHandler.deleteValue(PIGGY_BANKS, title);
};

export const getPiggyBanks = (): BlueBirdPromise<any[]> =>
  DatabaseHandler.getHashValues(PIGGY_BANKS);

export const updatePiggyBanks = () => {
  getPiggyBanks().then(piggyBanks => {
    (piggyBanks as PiggyBank[]).forEach(piggyBank => {
      const today = moment();
      const lastUpdated = moment(piggyBank.lastUpdated);
      console.log(lastUpdated.month(), today.month());
      if (lastUpdated.month() < today.month()) {
        // need to update
        piggyBank.currentTotal += piggyBank.amountPerMonth;
        addPiggyBank(piggyBank);
      }
    });
  });
};

export const addIncome = (income: Income) => {
  // DatabaseHandler.pushValue(INCOMES, income);
  DatabaseHandler.setHashValue(INCOMES, income.id, JSON.stringify(income));
};

export const deleteIncome = (id: string) => {
  DatabaseHandler.deleteValue(INCOMES, id);
};

export const getIncomes = (): BlueBirdPromise<any> =>
  DatabaseHandler.getHashValues(INCOMES);
