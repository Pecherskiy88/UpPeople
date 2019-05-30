import React from "react";
import Select from "react-select";
// import makeAnimated from "react-select/lib/animated";

export default ({
  name = "select",
  defaultValue,
  isMulti = false,
  isDisabled = false,
  closeMenuOnSelect,
  inputValue,
  value,
  options,
  components,
  theme,
  styles,
  selectOption,
  selectProps,
  setValue,
  placeholder,
  onChange,
  onInputChange
}) => (
  <Select
    name={name}
    defaultValue={defaultValue}
    isMulti={isMulti}
    isDisabled={isDisabled}
    inputValue={inputValue}
    value={value}
    options={options}
    closeMenuOnSelect={closeMenuOnSelect}
    components={components}
    theme={theme}
    styles={styles}
    selectOption={selectOption}
    selectProps={selectProps}
    setValue={setValue}
    placeholder={placeholder}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={onChange}
    onInputChange={onInputChange}
  />
);
