import React, { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";

const HelpIconButton = ({ title, content }) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleMouseEnter = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  return (
    <div className="relative inline-block">
      <HelpIcon
        sx={{ fontSize: 16, color: "gray" }} // Adjust the fontSize as needed
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showPopover && (
        <div
          id="popover-default"
          role="tooltip"
          className="absolute z-10 visible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <div className="px-3 py-2">
            <p>{content}</p>
          </div>
          <div data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default HelpIconButton;
