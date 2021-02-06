const express = require("express");
const itemRouter = express.Router();
const {
  saveItem,
  findItems,
  findCompleteItems,
  findIncompleteItems,
  updateItem,
  deleteItem,
} = require("../DAO/ItemDAO");

itemRouter.get("/view", async function (req, res) {
  const complete = req.query.complete;

  let items = await findItems();
  if (complete == "true") {
    items = await findCompleteItems();
  } else if (complete == "false") {
    items = await findIncompleteItems();
  }
  res.json(items);
});

itemRouter.post("/create", async function (req, res) {
  const title = req.body.Title;
  const description = req.body.Description;
  const due = req.body.Due;
  const complete = req.body.Complete;

  await saveItem(title, description, due, complete);
});

itemRouter.put("/update/:id", async function (req, res) {
  const id = req.params.id;
  const title = req.body.Title;
  const description = req.body.Description;
  const due = req.body.Due;
  const complete = req.body.Complete;
  await updateItem(id, title, description, due, complete);
});

itemRouter.delete("/delete/:id", async function (req, res) {
  const id = req.params.id;
  await deleteItem(id);
});

module.exports = itemRouter;
