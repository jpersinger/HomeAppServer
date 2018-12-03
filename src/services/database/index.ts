import BlueBirdPromise from "bluebird";
import redis, { ClientOpts } from "redis";
import url from "url";

class DatabaseHandler {
  client;

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

  setValue(key: string, field: string, value: any) {
    this.client.hset(key, field, value);
  }

  getValuesFromHashKey = (
    key: string,
    field: string,
    cleanData: (data: any) => any
  ) => {
    return new BlueBirdPromise((resolve, reject) => {
      this.client.hget(key, field, (err, data) => {
        if (!!err) {
          reject(err);
        } else {
          resolve(cleanData(data));
        }
      });
    });
  };

  getValues = (
    key: string,
    cleanData: (data: any) => any
  ): BlueBirdPromise<any[]> =>
    new BlueBirdPromise((resolve, reject) =>
      this.client.hkeys(key, (err, replies) => {
        const hashValues = replies.map(reply =>
          this.getValuesFromHashKey(key, reply, cleanData)
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
