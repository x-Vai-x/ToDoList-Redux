const { ItemModel } = require("../Models/Item");
const mongoose = require("mongoose");
DB = "mongodb+srv://admin:admin@cluster0.mu7nl.mongodb.net/to_do_list";

module.exports.saveItem = async function (title, description, due, complete) {
  await mongoose.connect(DB).then(console.log("connected"));

  const item = new ItemModel({
    Title: title,
    Description: description,
    Due: due,
    Complete: complete,
  });
  await item.save();
};

module.exports.findItems = async function () {
  await mongoose.connect(DB).then(console.log("connected"));

  return await ItemModel.find({});
};

module.exports.findCompleteItems = async function () {
  await mongoose.connect(DB).then(console.log("connected"));

  return await ItemModel.find({ Complete: true });
};

module.exports.findIncompleteItems = async function () {
  await mongoose.connect(DB).then(console.log("connected"));

  return await ItemModel.find({ Complete: false });
};

module.exports.updateItem = async function (
  id,
  title,
  description,
  due,
  complete
) {
  await mongoose.connect(DB).then(console.log("connected"));
  await ItemModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        Title: title,
        Description: description,
        Due: due,
        Complete: complete,
      },
    },
    { new: true }
  ).exec();
};

module.exports.deleteItem = async function (id) {
  await mongoose.connect(DB).then(console.log("connected"));
  await ItemModel.remove({ _id: id });
};
