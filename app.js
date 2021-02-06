require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.listen(8000);

app.use(express.static(path.resolve(__dirname + "/public/")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const {
  saveItem,
  findItems,
  findCompleteItems,
  findIncompleteItems,
  updateItem,
  deleteItem,
} = require("./DAO/ItemDAO");

app.get("/items/view", async function (req, res) {
  const complete = req.query.complete;

  let items = await findItems();
  if (complete == "true") {
    items = await findCompleteItems();
  } else if (complete == "false") {
    items = await findIncompleteItems();
  }
  res.json(items);
});

app.post("/items/create", async function (req, res) {
  const title = req.body.Title;
  const description = req.body.Description;
  const due = req.body.Due;
  const complete = req.body.Complete;

  await saveItem(title, description, due, complete);
});

app.put("/items/update/:id", async function (req, res) {
  const id = req.params.id;
  const title = req.body.Title;
  const description = req.body.Description;
  const due = req.body.Due;
  const complete = req.body.Complete;
  await updateItem(id, title, description, due, complete);
});

app.delete("/items/delete/:id", async function (req, res) {
  const id = req.params.id;
  await deleteItem(id);
});
