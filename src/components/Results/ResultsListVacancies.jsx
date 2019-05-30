import React from "react";
import ResultsItemsVacancies from "./ResultsItemsVacancies";

const ResultsListVacancies = ({ vacancies }) => {
  return (
    <ul>
      {vacancies
        ? vacancies.map(el => (
            <ResultsItemsVacancies vacancies={el} key={el.id} />
          ))
        : []}
    </ul>
  );
};

export default ResultsListVacancies;
