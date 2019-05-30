// Core
import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
// Components
import CandidateProfileTableRow from "./TableRow";

const CandidateProfileTable = ({ candidateStatuses, ...props }) => {
  const candidateStatusesJSX =
    candidateStatuses.length > 0 ? (
      candidateStatuses.map((candidateStatus, idx) => (
        <tr key={candidateStatus.id}>
          <CandidateProfileTableRow idx={idx} {...candidateStatus} {...props} />
        </tr>
      ))
    ) : (
      <tr style={{ color: "var(--secondary)" }}>
        <td colSpan={9} align="center">
          Nothing found{" "}
          <span role="img" aria-label="confused face">
            😕
          </span>
        </td>
      </tr>
    );

  return (
    <Table style={{ background: "var(--white)" }} responsive hover>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Platform</th>
          <th scope="col">Vacancy</th>
          <th scope="col">Company</th>
          <th scope="col">Last update</th>
          <th scope="col">Status</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>{candidateStatusesJSX}</tbody>
    </Table>
  );
};

CandidateProfileTable.propTypes = {
  candidateStatuses: PropTypes.arrayOf(PropTypes.shape({}))
};

CandidateProfileTable.defaultProps = {
  candidateStatuses: []
};

export default CandidateProfileTable;
