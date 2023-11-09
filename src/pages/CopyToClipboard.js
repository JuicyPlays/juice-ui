import { Button, Snackbar } from "@mui/material";
import { useState } from "react";

const CopyToClipboardButton = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(props.player);
  };

  const buttonStyle = {
    textAlign: "left",
    // Add any additional styles you need here
  };

  return (
    <>
      <Button onClick={handleClick} style={buttonStyle}>
        {props.player}
      </Button>
    </>
  );
};

export default CopyToClipboardButton;

