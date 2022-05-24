var express = require("express");
var router = express.Router();

var User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json({ msg: "user information" });
});

router.post("/register", async function (res, req, next) {
  try {
    var user = await User.create(req.body);
    console.log(user);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async function (res, req, next) {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email/password required" });
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "email not registered" });
    }
    var result = await user.verifyPassword(password);
    console.log(user, result);
    if (!result) {
      return res.status(400).json({ error: "invalid password" });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
