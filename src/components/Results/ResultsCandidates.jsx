import React from "react";

const ResultsCandidates = ({ units }) => {
  console.log("units: ", units);
  return (
    <li>
      <p>{units.name}</p>
      <p>{units.platform}</p>
      <p>{units.phone}</p>
      <p>{units.email}</p>
      <p>{units.skype}</p>
    </li>
  );
};

export default ResultsCandidates;
