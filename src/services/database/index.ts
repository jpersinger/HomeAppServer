import BlueBirdPromise from "bluebird";
import redis, { ClientOpts } from "redis";
import url from "url";

class DatabaseHandler {
  client: redis.RedisClient;

  constructor() {
    this.client = this.getClient();
  }

  getClient() {
    if (process.env.REDISTOGO_URL) {
      const rtg = url.parse(process.env.REDISTOGO_URL);
      const client = redis.createClient(
        rtg.port || "",
        rtg.hostname as ClientOpts
      );

      const auth = rtg.auth || "";
      client.auth(auth.split(":")[1]);
      return client;
    } else {
      const client = redis.createClient();
      return client;
    }
  }

  setHashValue(key: string, field: string, value: any) {
    this.client.hset(key, field, value);
  }

  deleteValue(key: string, field: string) {
    this.client.hdel(key, field);
  }

  getValuesFromHashKey = (key: string, field: string) => {
    return new BlueBirdPromise((resolve, reject) => {
      this.client.hget(key, field, (err, data) => {
        if (!!err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  };

  getHashValues = (key: string): BlueBirdPromise<any[]> =>
    new BlueBirdPromise((resolve, reject) =>
      this.client.hkeys(key, (err, replies) => {
        const hashValues = replies.map(reply =>
          this.getValuesFromHashKey(key, reply)
        );
        BlueBirdPromise.all(hashValues).then(values => {
          resolve(values);
        });
      })
    );
}

const instance = new DatabaseHandler();
Object.freeze(instance);

export default instance;
