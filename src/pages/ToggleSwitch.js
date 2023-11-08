import React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

function ToggleSwitch({ isChecked, onToggleChange }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={isChecked}
          onChange={onToggleChange}
          name="toggleSwitch"
          color="primary"
        />
      }
      label="Slip/List View"
    />
  );
}

export default ToggleSwitch;
