const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  section_name: {type: String, required: true},
  image_id : {type: String, required: true},
  image_filename: {type: String, required: true}
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;