import React, { useState } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ItemsPage from "../../pages/ItemsPage";

export default function CompleteFilterDropdown() {
  const [complete, setComplete] = useState(2);

  function handleChange(event: React.ChangeEvent<{ value: unknown }>) {
    setComplete(event.target.value as number);
  }

  return (
    <>
      <FormControl>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="satus-select-label"
          id="status-select"
          onChange={handleChange}
        >
          <MenuItem value={0}>Incomplete</MenuItem>
          <MenuItem value={1}>Complete</MenuItem>
          <MenuItem value={2}>All</MenuItem>
        </Select>
      </FormControl>
      <ItemsPage complete={complete} />
    </>
  );
}
