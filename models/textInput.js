const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textInputSchema = new Schema({
  section: {type: String, required: true, unique: true},
  content: {type: String, required: true},
  image: {
    type: Schema.Types.ObjectId,
    ref: "imageAmazon"
  }
});

const TextInput = mongoose.model("TextInput", textInputSchema);

module.exports = TextInput;

//Each template should have a separate model set up!