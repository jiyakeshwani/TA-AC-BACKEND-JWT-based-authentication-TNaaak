var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var Comment = require("../models/comment");

var auth = require("../middlewares/auth");
const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth");

router.get("/", function (req, res, next) {
  res.json({ books });
});

router.post("/:id/comment", auth.verifyToken, (res, req, next) => {
  var id = req.params.id;
  Book.find(id, (err, books) => {
    if (err) return res.status(500).json(err);
    Comment.create((err, comment) => {
      if (err) return res.status(500).json(err);
      res.json({ comment });
    });
  });
});

router.get("/:id/comment", (res, req, next) => {
  var id = req.params.id;
  Book.find(id, (err, books) => {
    if (err) return res.status(500).json(err);
    Comment.find((err, comments) => {
      if (err) return res.status(500).json(err);
      res.json({ comments });
    });
  });
});

router.get("/:id/comment/edit", auth.verifyToken, (res, req, next) => {
  var id = req.params.id;
  Book.find(id, (err, books) => {
    if (err) return res.status(500).json(err);
    Comment.findByIdAndUpdate(id, (err, updatedComment) => {
      if (err) return res.status(500).json(err);
      res.json({ updatedComment });
    });
  });
});

router.get("/:id/comment/delete", auth, verifyToken, (res, req, next) => {
  var id = req.params.id;
  Book.find(id, (err, book) => {
    if (err) return res.status(500).json(err);
    Comment.findByIdAndDelete((err, deletedComment) => {
      if (err) return res.status(500).json(err);
      res.json({ deletedComment });
    });
  });
});

module.exports = router;
