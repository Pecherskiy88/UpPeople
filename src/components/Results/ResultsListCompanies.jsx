import React from "react";
import ResultsItemsCompanies from "./ResultsItemsCompanies";
import s from "./Results.module.css";

const ResultsListCompanies = ({ companies }) => {
  return (
    <ul className={s.List_companies}>
      {companies
        ? companies.map(el => (
            <ResultsItemsCompanies companies={el} key={el.id} />
          ))
        : []}
    </ul>
  );
};

export default ResultsListCompanies;
