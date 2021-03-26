const { ItemModel } = require("../Models/Item");
const mongoose = require("mongoose");

module.exports.saveItem = async function (title, description, due, complete) {
  await mongoose.connect(process.env.DB).then(console.log("connected"));

  const item = new ItemModel({
    Title: title,
    Description: description,
    Due: due,
    Complete: complete,
  });
  return await item.save();
};

module.exports.findItems = async function () {
  await mongoose.connect(process.env.DB).then(console.log("connected"));

  return await ItemModel.find({});
};

module.exports.findCompleteItems = async function () {
  await mongoose.connect(process.env.DB).then(console.log("connected"));

  return await ItemModel.find({ Complete: true });
};

module.exports.findIncompleteItems = async function () {
  await mongoose.connect(process.env.DB).then(console.log("connected"));

  return await ItemModel.find({ Complete: false });
};

module.exports.updateItem = async function (
  id,
  title,
  description,
  due,
  complete
) {
  await mongoose.connect(process.env.DB).then(console.log("connected"));
  return await ItemModel.findOneAndUpdate(
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
  await mongoose.connect(process.env.DB).then(console.log("connected"));
  return await ItemModel.findByIdAndRemove(id);
};
