import React from "react";

const ResultsCompanies = ({ places }) => {
  console.log("places: ", places);
  return (
    <li>
      <p>{places.nazva}</p>
      <img src="" alt="img" />
    </li>
  );
};

export default ResultsCompanies;
