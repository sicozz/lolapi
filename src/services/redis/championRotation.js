import redisClient from './client.js';

const secsInADay = 60 * 60 * 24;

const isCached = () => {
  return new Promise((resolve, reject) => {
    redisClient.get('rotation', async (err, data) => {
      if (err) {
        return reject(err);
      }
      if (data != null) {
        return resolve(true);
      }

      return data != null ?
        resolve(true) :
        resolve(false)

    });
  });
};

const setCached = () => {
  return redisClient.setex('rotation', secsInADay, true);
};

export default {
  isCached,
  setCached,
};
