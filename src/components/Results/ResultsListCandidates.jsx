import React from "react";
import ResultsItemsCandidates from "./ResultsItemsCandidates";
import Loader from "react-loader-spinner";
import s from "./Results.module.css";

const ResultsListCandidates = ({ candidates }) => {
  return (
    <ul className={s.List_candidates}>
      {candidates ? (
        candidates.map((el, idx) => (
          <ResultsItemsCandidates candidates={el} key={idx} />
        ))
      ) : (
        <Loader type="Plane" color="#00BFFF" height="100" width="100" />
      )}
    </ul>
  );
};

export default ResultsListCandidates;
