import React from "react";
import ResultsCandidates from "./ResultsCandidates";
import ResultsCompanies from "./ResultsCompanies";
import Loader from "react-loader-spinner";

const Results = ({ globalDataObj }) => {
  console.log("candidates: ", globalDataObj.candidates);
  console.log("companies: ", globalDataObj.companies);
  const candidates = globalDataObj.candidates;
  const companies = globalDataObj.companies;
  return (
    <ul>
      {candidates ? (
        candidates.map(el => <ResultsCandidates units={el} />)
      ) : (
        <Loader type="Plane" color="#00BFFF" height="100" width="100" />
      )}
      {companies ? (
        companies.map(el => <ResultsCompanies places={el} />)
      ) : (
        <Loader type="Plane" color="#00BFFF" height="100" width="100" />
      )}
    </ul>
  );
};

export default Results;
