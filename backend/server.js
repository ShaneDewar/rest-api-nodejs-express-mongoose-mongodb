const express = require("express");
const server = express();
const cors = require("cors");

const port = 3033;

var cors_options = {
  origin: ["http://localhost:5173"],
};

server.use(cors(cors_options));
server.use(express.json());
server.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded coverage.

const db = require("./models/database.js");
db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((err) => {
    console.log("Cannot connect to the database.", err);
    process.exit();
  });

require("./routes/media.routes.js")(server);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
