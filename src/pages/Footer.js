import React from "react";
import { Twitter, MailOutline } from "@mui/icons-material";
import {
  termsAndConditions, 
  termsAndConditionsPDF
} from "../common/constants";

const openPdfInNewTab = () => {
  window.open(termsAndConditionsPDF, '_blank');
};

const Footer = () => {
  return (
    <footer>
      <div style={iconContainer}>
        <a
          href="https://twitter.com/pancakeparlay"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter fontSize="large" style={iconStyles} />
        </a>
        <a href="mailto:juicyplaysofficial@gmail.com">
          <MailOutline fontSize="large" style={iconStyles} />
        </a>
        {/* <a href="https://discord.com/your-discord" target="_blank" rel="noopener noreferrer" style={discordLink}>
          <FontAwesomeIcon icon={faDiscord} style={{ ...iconStyles, fontSize: '20px' }} />
        </a> */}
      </div>
      <div style={iconContainer}>
        <div onClick={openPdfInNewTab}>{termsAndConditions}</div>
      </div>
    </footer>
  );
};

const iconContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const iconStyles = {
  color: "#fff",
  fontSize: "24px", // Match the Discord icon size with the other icons
};

// const discordLink = {
//   textDecoration: "none",
// };

export default Footer;
