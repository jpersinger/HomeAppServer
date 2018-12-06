const { RECIPES } = require("./constants");
import BlueBirdPromise from "bluebird";
import DatabaseHandler from "../";
import { MESSAGES } from "./constants";
import { Message } from "./home.definitions";

export const addMessage = (message: Message) => {
  DatabaseHandler.setHashValue(MESSAGES, message.id, JSON.stringify(message));
};

export const getMessages = (): BlueBirdPromise<any[]> =>
  DatabaseHandler.getHashValues(MESSAGES);
