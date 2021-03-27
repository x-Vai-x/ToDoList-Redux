import { CreateItemData, Item } from "../../dataTypes";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import moment from "moment";
import { useForm } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useDispatch } from "react-redux";

import {
  createItem,
  updateItem,
} from "../../redux/thunkActions/itemsThunkActions";

type IProps = {
  existingItem?: Item;
};

export default function ItemDialog({ existingItem }: IProps) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm<CreateItemData>({});
  const dispatch = useDispatch();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function submitForm(data: CreateItemData) {
    existingItem
      ? dispatch(updateItem({ ...data, _id: existingItem._id }))
      : dispatch(createItem(data));
    setOpen(false);
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        {existingItem ? <EditIcon /> : <AddIcon />}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(submitForm)}>
          <DialogTitle id="form-dialog-title">
            {existingItem ? "Edit " : "Add "}Item
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="Title"
              label="Title"
              type="text"
              fullWidth
              defaultValue={existingItem?.Title}
              inputRef={register({ required: true })}
            />
            {errors.Title && <span>Title field is required</span>}
            <TextField
              autoFocus
              margin="dense"
              name="Description"
              label="Description"
              type="text"
              fullWidth
              defaultValue={existingItem?.Description}
              inputRef={register}
            />
            <TextField
              autoFocus
              margin="dense"
              name="Due"
              label="Due by"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={
                existingItem?.Due
                  ? moment(existingItem.Due).format("YYYY-MM-DD")
                  : "No due date"
              }
              inputRef={register}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={existingItem?.Complete ? true : false}
                  name="Complete"
                  color="secondary"
                />
              }
              label="Complete"
              inputRef={register}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
