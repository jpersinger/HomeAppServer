import BlueBirdPromise from "bluebird";
import DatabaseHandler from "../";
import { PERSONAL_GOALS } from "./constants";
import { PersonalGoal } from "./personal_goals.definitions";

export const addNewPersonalGoal = (personalGoal: PersonalGoal) => {
  // DatabaseHandler.setHashValue(PERSONAL_GOALS, peron.id, JSON.stringify(user));
  // TODO
};

export const getPersonalGoalsForUser = (id: string): BlueBirdPromise<any> =>
  new BlueBirdPromise((resolve, reject) => {
    DatabaseHandler.getValuesFromHashKey(PERSONAL_GOALS, id)
      .then(goals => {
        resolve(goals);
      })
      .catch(err => {
        reject(err);
      });
  });
