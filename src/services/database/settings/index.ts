import BlueBirdPromise from "bluebird";
import { find } from "lodash";
import DatabaseHandler from "../";
import { USER_DATA } from "./constants";
import { UserData } from "./settings.defintions";

export const addNewUser = (user: UserData) => {
  DatabaseHandler.setHashValue(USER_DATA, user.id, JSON.stringify(user));
};

export const getUserDataById = (id: string): BlueBirdPromise<any[]> =>
  new BlueBirdPromise((resolve, reject) => {
    getUserData().then(userData => {
      const data = find(userData, ({ id }) => id === id);
      console.log("by id", data);
      resolve(data);
    });
  });

export const getUserDataByEmail = (email: string): BlueBirdPromise<any[]> =>
  new BlueBirdPromise((resolve, reject) => {
    getUserData().then(userData => {
      const data = find(
        userData,
        ({ linkedEmails }) => linkedEmails.indexOf(email) !== -1
      );
      console.log("by email", data);
      resolve(data);
    });
  });

const getUserData = (): BlueBirdPromise<any[]> =>
  DatabaseHandler.getHashValues(USER_DATA);
