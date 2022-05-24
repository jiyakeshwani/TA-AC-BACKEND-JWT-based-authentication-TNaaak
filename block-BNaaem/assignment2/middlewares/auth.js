const { json } = require("express/lib/response");
var jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: async (res, req, next) => {
    var token = await req.headers.authorization;
    try {
      if (token) {
        var payload = await jwt.verify(token, "thisisasecret");
        req.user = payload;
        next();
      } else {
        return res.status(400).json({ error: "token required" });
      }
    } catch (error) {
      next(error);
    }
  },
};
