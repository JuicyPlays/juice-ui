import React from "react";
import Select from "react-select";

const MySelect = ({ options, handleChanges, label, defaultSelected = [], isMulti = true }) => {
  const [selectedOptions, setSelectedOptions] = React.useState(defaultSelected);

  const onInputChange = (selected) => {
    setSelectedOptions(selected);
    handleChanges(selected);
  };

  return (
    <Select
      isMulti={isMulti}
      defaultValue={selectedOptions}
      onChange={onInputChange}
      name={label}
      classNamePrefix="react-select-dark"
      placeholder={label}
      options={options}
      maxMenuHeight={260}
      menuPortalTarget={document.body}
      menuPosition="fixed"
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        // Let CSS classes handle the rest — only override width to stretch within parent
        control: (base) => ({
          ...base,
          minWidth: "180px",
        }),
      }}
    />
  );
};

export default MySelect;
