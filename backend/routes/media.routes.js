module.exports = (routes) => {
  const media = require("../controllers/media.controller.js");

  let router = require("express").Router();

  // Create Media
  router.post("/create", media.create);

  // Update Media by ID
  router.put("/:id", media.update);

  // Search Media
  router.get("/search/:search_value", media.search);

  // Find all Media
  router.get("/media", media.findAll);

  // Find all Media
  // This also has the side effect of returning empty lists to api calls to the server with non-existing endpoints
  router.get("/:format", media.findAllOfFormat);

  // Find One by ID
  router.get("/media/:id", media.findById);

  // Delete Media by ID
  router.delete("/media/:id", media.delete);

  routes.use("/", router);
};
