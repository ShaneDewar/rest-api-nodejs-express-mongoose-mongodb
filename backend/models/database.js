const db_config = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = db_config.url;

db.media = require("../models/media.model.js")(mongoose);

module.exports = db;
