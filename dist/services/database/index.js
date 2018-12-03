"use strict";
var redis = require("redis");
var url = require("url");
var RECIPES = require("./constants").RECIPES;
var getClient = function () {
    if (process.env.REDISTOGO_URL) {
        var rtg = url.parse(process.env.REDISTOGO_URL);
        var client = redis.createClient(rtg.port || "", rtg.hostname);
        var auth = rtg.auth || "";
        console.log(client.auth);
        client.auth(auth.split(":")[1]);
        console.log(client.auth);
        return client;
    }
    else {
        console.log("creating new client");
        var client = redis.createClient();
        return client;
    }
    // setInterval(() => {
    //   sendLocalData();
    //   pullServerData();
    // }, 60000);
};
module.exports.getRecipes = function () {
    var client = getClient();
    client.set(RECIPES, "hi", redis.print);
    console.log("size", client.dbsize());
    console.log("recipes", client.get(RECIPES));
    return client.get(RECIPES);
};
// const sendLocalData = () => {
//   console.log("sending");
//   client.hset(RECIPES, "oatmeal", "piece 1", redis.print);
// };
// const pullServerData = () => {
//   console.log("pulling");
//   client.hkeys(RECIPES, (err, replies) => {
//     console.log(replies.length, " replies:");
//     replies.forEach((reply, i) => {
//       console.log("        ", i, ": ", reply);
//     });
//   });
// };
