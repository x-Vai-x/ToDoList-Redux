const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ToDoList")
  .then(console.log("connected"));

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
  },

  Due: {
    type: Date,
  },
});

module.exports.ItemModel = mongoose.model("Item", ItemSchema);
