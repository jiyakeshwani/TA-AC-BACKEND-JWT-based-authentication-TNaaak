var express = require("express");
const auth = require("../middlewares/auth");
var router = express.Router();

var Book = require("../models/book");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ books });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Book.find(id, (err, books) => {
    if (err) return res.status(500).json(err);
    res.json({ books });
  });
});

router.post("/new", auth.verifyToken, (res, req, next) => {
  Book.create((err, createdBook) => {
    if (err) return res.status(500).json(err);
    res.json({ createdBook });
  });
});

router.put("/:id/edit ", auth.verifyToken, (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, (err, updatedBook) => {
    if (err) return res.status(500).json(err);
    res.json({ updatedBook });
  });
});

router.delete("/:id/delete", auth.verifyToken, (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deletedBook) => {
    if (err) return res.status(500).json(err);
    res.json({ deletedBook });
  });
});
module.exports = router;
