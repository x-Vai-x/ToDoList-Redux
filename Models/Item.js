const mongoose = require("mongoose");

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

  Complete: {
    type: Boolean,
    default: false,
  },
});

module.exports.ItemModel = mongoose.model("Item", ItemSchema);
