// Core
import React from "react";
import PropTypes from "prop-types";
// Components
import CandidateProfileLogCard from "./LogCard";

const CandidateProfileLogsList = ({ logs }) => {
  const logsJSX =
    logs.length > 0 ? (
      logs.map(log => (
        <li key={log.id}>
          <CandidateProfileLogCard {...log} />
        </li>
      ))
    ) : (
      <li style={{ color: "var(--secondary)" }}>
        There are no logs{" "}
        <span role="img" aria-label="confused face">
          😕
        </span>
      </li>
    );

  return (
    <>
      <h4>Candidate's logs</h4>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 0,
          listStyle: "none"
        }}
      >
        {logsJSX}
      </ul>
    </>
  );
};

CandidateProfileLogsList.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      text: PropTypes.string
    })
  )
};

CandidateProfileLogsList.defaultProps = {
  logs: []
};

export default CandidateProfileLogsList;
