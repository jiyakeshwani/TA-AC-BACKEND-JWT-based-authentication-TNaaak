var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    body: { type: String },
    tagList: [{ type: String }],

    author: { type: Object, require: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
