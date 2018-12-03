const redis = require("redis");
const url = require("url");
const { RECIPES } = require("./constants");
const BlueBirdPromise = require("bluebird");

const getClient = () => {
  const temp =
    "redis://redistogo:7e4530aa737cc1bbb5fbbc11d69c82cf@barb.redistogo.com:9990/";
  // if (process.env.REDISTOGO_URL) {
  if (temp) {
    const rtg = url.parse(temp);
    const client = redis.createClient(rtg.port || "", rtg.hostname);

    const auth = rtg.auth || "";
    client.auth(auth.split(":")[1]);
    return client;
  } else {
    console.log("creating new client");
    const client = redis.createClient();
    return client;
  }
};

module.exports.getRecipes = (): Promise<string> =>
  new BlueBirdPromise((resolve, reject) => {
    getClient().get(RECIPES, (err, data) => {
      if (!!err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

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
