import BlueBirdPromise from "bluebird";
import { find, isEmpty } from "lodash";
import DatabaseHandler from "../";
import { USER_DATA } from "./constants";
import { UserData } from "./settings.defintions";

export const addNewUser = (user: UserData) => {
  DatabaseHandler.setHashValue(USER_DATA, user.id, JSON.stringify(user));
};

export const updateDisplayName = (id: string, displayName: string) => {
  updateUserField(id, { displayName });
};

export const updateTextColor = (id: string, textColor: string) => {
  updateUserField(id, { textColor });
};

export const updateLinkedEmails = (id: string, linkedEmails: string[]) => {
  updateUserField(id, { linkedEmails });
};

export const updatePushNotificationsEnabled = (
  id: string,
  pushNotificationsEnabled: boolean
) => {
  updateUserField(id, { pushNotificationsEnabled });
};

const updateUserField = (id: string, field: any) => {
  getUser({ id }).then(user => {
    if (isEmpty(user)) {
      return;
    }
    DatabaseHandler.setHashValue(
      USER_DATA,
      id,
      JSON.stringify({ ...user, ...field })
    );
  });
};

export const getUser = ({
  id,
  email
}: {
  id?: string;
  email?: string;
}): BlueBirdPromise<any> =>
  new BlueBirdPromise((resolve, reject) => {
    if (!id && !email) {
      resolve({});
      return;
    }
    getUserData().then(userData => {
      const data = find(userData, user => user.id === id);
      const emailData = find(
        userData,
        user =>
          user.email === email ||
          (user.linkedEmails && user.linkedEmails.indexOf(email) !== -1)
      );
      resolve(isEmpty(data) ? emailData : data);
    });
  });

const getUserData = (): BlueBirdPromise<any[]> =>
  DatabaseHandler.getHashValues(USER_DATA);
