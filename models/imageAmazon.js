const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageAmazonSchema = new Schema({
  fieldName: { type: String, required: true },
  originalFilename: { type: String, required: true },
  path: { type: String, required: true },
  headers: { type: String, required: true },
  size: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  section: { type: String, required: true }
});

const ImageAmazon = mongoose.model("ImageAmazon", imageAmazonSchema);

module.exports = ImageAmazon;

