var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: Number,
    quantity: Number,
    comment: { type: Schema.Types.ObjectId, ref: comment },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
