const credentials = require("./.secrets.json");

module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@0.0.0.0:40191/mern-mongo-db`,
  // url: `mongodb://${credentials.username}:${credentials.password}@0.0.0.0:27017/mern-mongo-db`,
};
