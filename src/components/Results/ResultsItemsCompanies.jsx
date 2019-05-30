import React from "react";
import s from "./Results.module.css";

const ResultsItemsCompanies = ({ companies }) => {
  return (
    <li className={s.Item_companies}>
      <img src="" alt="img" />
      <p>{companies.nazva}</p>
    </li>
  );
};

export default ResultsItemsCompanies;
