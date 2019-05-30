import React from "react";
import s from "./FormGlobalSearch.module.css";

const FormGlobalSearch = ({
  globalSearchText,
  globalSearchChange,
  globalSearchSubmit
}) => {
  return (
    <form className={s.Form} type="submit" onSubmit={globalSearchSubmit}>
      <input
        className={s.Input}
        placeholder="Search..."
        type="text"
        value={globalSearchText}
        onChange={globalSearchChange}
      />
    </form>
  );
};

export default FormGlobalSearch;
