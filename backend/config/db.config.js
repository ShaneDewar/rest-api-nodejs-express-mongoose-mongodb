const credentials = require("./.secrets.json");

module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@mongo:27017/mern-mongo-db`,
  // url: `mongodb://${credentials.username}:${credentials.password}@127.0.0.1:27017/mern-mongo-db`,
};
