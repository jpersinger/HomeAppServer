"use strict";
// const BlueBirdPromise = require("bluebird");
// const redis = require("redis");
// const url = require("url");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = __importDefault(require("bluebird"));
const redis_1 = __importDefault(require("redis"));
const url_1 = __importDefault(require("url"));
class DatabaseHandler {
    constructor() {
        this.getValuesFromHashKey = (key, field, cleanData) => {
            return new bluebird_1.default((resolve, reject) => {
                this.client.hget(key, field, (err, data) => {
                    if (!!err) {
                        reject(err);
                    }
                    else {
                        resolve(cleanData(data));
                    }
                });
            });
        };
        this.getValues = (key, cleanData) => {
            return new bluebird_1.default((resolve, reject) => this.client.hkeys(key, (err, replies) => {
                const hashValues = replies.map(reply => this.getValuesFromHashKey(key, reply, cleanData));
                bluebird_1.default.all(hashValues).then(values => {
                    resolve(values);
                });
            }));
        };
        this.client = this.getClient();
    }
    getClient() {
        const temp = "redis://redistogo:7e4530aa737cc1bbb5fbbc11d69c82cf@barb.redistogo.com:9990/";
        // if (process.env.REDISTOGO_URL) {
        if (temp) {
            const rtg = url_1.default.parse(temp);
            const client = redis_1.default.createClient(rtg.port || "", rtg.hostname);
            const auth = rtg.auth || "";
            client.auth(auth.split(":")[1]);
            return client;
        }
        else {
            const client = redis_1.default.createClient();
            return client;
        }
    }
    setValue(key, field, value) {
        this.client.hset(key, field, value);
    }
}
const instance = new DatabaseHandler();
Object.freeze(instance);
exports.default = instance;
