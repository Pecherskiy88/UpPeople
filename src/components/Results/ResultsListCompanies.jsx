import React from "react";
import ResultsItemsCompanies from "./ResultsItemsCompanies";
import Loader from "react-loader-spinner";
import s from "./Results.module.css";

const ResultsListCompanies = ({ companies }) => {
  return (
    <ul className={s.List_companies}>
      {companies ? (
        companies.map(el => (
          <ResultsItemsCompanies companies={el} key={el.id} />
        ))
      ) : (
        <Loader type="Plane" color="#00BFFF" height="100" width="100" />
      )}
    </ul>
  );
};

export default ResultsListCompanies;
