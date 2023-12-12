import { Button } from "@mui/material";
import { useState } from "react";

const CopyToClipboardButton = (props) => {
  const [, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(props.player);
  };

  const buttonStyle = {
    textAlign: "left",
    fontSize: "12px",
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
