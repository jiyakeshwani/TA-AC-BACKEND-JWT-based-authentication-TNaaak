var mongoose = require("mongoose");
const book = require("./book");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, required: true },

    book: { type: Schema.Types.ObjectId, ref: book },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
