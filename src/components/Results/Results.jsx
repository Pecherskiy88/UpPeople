import React from "react";
import s from "./Results.module.css";
import ResultsListCompanies from "./ResultsListCompanies";
import ResultsListCandidates from "./ResultsListCandidates";
import ResultsListVacancies from "./ResultsListVacancies";
import ResultsListContacts from "./ResultsListContacts";

const Results = ({ globalDataObj }) => {
  console.log("globalDataObj: ", globalDataObj);

  console.log("candidates: ", globalDataObj.candidates);
  console.log("companies: ", globalDataObj.companies);
  console.log("contacts: ", globalDataObj.contacts);
  console.log("vacancies: ", globalDataObj.vacancies);
  const candidates = globalDataObj.candidates;
  const companies = globalDataObj.companies;
  const contacts = globalDataObj.contacts;
  const vacancies = globalDataObj.vacancies;

  return (
    <div className={s.ResultsWrapper}>
      <ResultsListCompanies companies={companies} />
      <ResultsListCandidates candidates={candidates} />
      <ResultsListVacancies vacancies={vacancies} />
      <ResultsListContacts contacts={contacts} />
    </div>
  );
};

export default Results;
