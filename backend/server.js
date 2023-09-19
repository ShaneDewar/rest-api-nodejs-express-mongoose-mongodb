const express = require("express");
const server = express();
const cors = require("cors");
const { rateLimit } = require('express-rate-limit');
const logger = require("./logging/logger.js");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    standardHeaders: false, // disable rate-limit headers
    legacyHeaders: false, // disable legacy headers
  });

const port = 3033;

var cors_options = {
  origin: ["http://localhost:5173"],
};

server.use(cors(cors_options));

server.use(limiter);
server.use(express.json());
server.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded coverage.

const db = require("./models/database.js");
db.mongoose
  .connect(db.url, {})
  .then(() => {
    logger.log("Connected to the database.");
  })
  .catch((err) => {
    logger.log("Cannot connect to the database.", err);
    process.exit();
  });

require("./routes/media.routes.js")(server);

server.listen(port, () => {
  logger.log(`Server started on port ${port}`);
});
