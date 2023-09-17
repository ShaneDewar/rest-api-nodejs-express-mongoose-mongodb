const credentials = require("../../backend/.secrets.json");

module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@0.0.0.0:40191/mern-mongo-db`,
};
