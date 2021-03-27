import React from "react";
import { useDispatch } from "react-redux";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { setFilteredStatus } from "../../redux/slices/itemStatusesSlice";
import { useSelector } from "../../redux/rootReducer";

export default function CompleteFilterDropdown() {
  const dispatch = useDispatch();

  const { filterStatus } = useSelector((state) => state.itemStatuses);

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    dispatch(setFilteredStatus(event.target.value as number));
  }

  return (
    <>
      <FormControl>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="satus-select-label"
          id="status-select"
          onChange={handleChange}
          defaultValue={filterStatus}
        >
          <MenuItem value={0}>Incomplete</MenuItem>
          <MenuItem value={1}>Complete</MenuItem>
          <MenuItem value={2}>All</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
