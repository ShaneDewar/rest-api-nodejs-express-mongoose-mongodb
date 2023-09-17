const { request } = require("express");
const db = require("../models/database.js");
const Media = db.media;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const media = new Media({
    title: req.body.title,
    authors: req.body.authors,
    format: req.body.format,
    publish_date: req.body.publish_date,
    date_added: req.body.date_added,
    genres: req.body.genres,
    have_used: req.body.have_used,
    date_last_used: req.body.date_last_used,
    keywords: req.body.keywords,
    languages: req.body.languages,
    isbn: req.body.isbn,
    size: req.body.size,
    notes: req.body.notes,
  });

  media
    .save(media)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the Media.",
      });
    });
};

// Update the media with the given ID and submitted data
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Some data is needed to update this Media.",
    });
  }

  const id = req.params.id;

  Media.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Media with id=${id}. Maybe Media was not found!`,
        });
      } else
        res.send({ message: `Media with id=${id} was updated successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Media with with id=${id}`,
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;

  // Case insensitive mongo query
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  console.log(`finding all ${condition}`);
  Media.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving all media.",
      });
    });
};

exports.findAllOfFormat = (req, res) => {
  const requestFormat = req.params.format;
  console.log(`finding all ${requestFormat}`);

  var condition = requestFormat
    ? { format: { $regex: new RegExp(requestFormat), $options: "i" } }
    : {};

  console.log(`finding all ${condition}`);
  Media.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occurred while retrieving all ${requestFormat}.`,
      });
    });
};

exports.search = (req, res) => {
  const searchValue = req.params.search_value;
  console.log(`searching for ${searchValue}`);

  let condition = searchValue
    ? {
        $text: {
          $search: searchValue,
        },
      }
    : {};

  console.log(condition);

  Media.find(condition)
    .then((data) => {
      res.send(data);
      console.log("Result" + data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occurred while searching for ${searchValue}.`,
      });
    });
};

// Find a specific media by id
exports.findById = (req, res) => {
  const id = req.params.id;

  Media.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: `Media ID${id} not found.` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Media with id=" + id });
    });
};

// Delete a Media by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Media.deleteById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to delete Media with ID${id}. Nothing with that ID found.`,
        });
      } else {
        res.send({
          message: `Media ID${id} was deleted successfully!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error deleting Media ID${id}`,
      });
    });
};
