import { Item } from "../../dataTypes";
import ItemDialog from "../dialogs/ItemDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import moment from "moment";

type IProps = {
  item: Item;
};

export default function ItemDetail({ item }: IProps) {
  function deleteItem() {
    fetch("/items/delete/" + item._id, {
      method: "DELETE",
    })
      .then()
      .catch();
  }

  return (
    <div
      style={{
        backgroundColor: "#fffdd0",
        border: "2px solid red",
        borderRadius: "25px",
      }}
    >
      <IconButton>
        <DeleteIcon onClick={deleteItem} />
      </IconButton>

      <ItemDialog existingItem={item} />
      <p>Title: {item.Title}</p>
      <p>Description: {item.Description ?? "No description"}</p>
      <p>
        Due date:{" "}
        {item.Due ? moment(item.Due).format("YYYY-MM-DD") : "No due date"}
      </p>
    </div>
  );
}
