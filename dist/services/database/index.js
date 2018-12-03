"use strict";
var redis = require("redis");
var url = require("url");
var RECIPES = require("./constants").RECIPES;
var getClient = function () {
    var temp = "redis://redistogo:7e4530aa737cc1bbb5fbbc11d69c82cf@barb.redistogo.com:9990/";
    if (temp) {
        var rtg = url.parse(temp);
        console.log("rtg", rtg, rtg.hostname);
        var client = redis.createClient(rtg.port || "", rtg.hostname);
        console.log("client", client);
        var auth = rtg.auth || "";
        console.log("auth", auth);
        client.auth(auth.split(":")[1]);
        console.log("client again", client);
        return client;
    }
    else {
        console.log("creating new client");
        var client = redis.createClient();
        console.log("new client", client);
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
