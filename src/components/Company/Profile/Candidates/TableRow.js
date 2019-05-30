// Core
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
// Components
import Select from "../../../shared/Select";

const CompanyProfileCandidatesTableRow = ({
  idx,
  id,
  company_id,
  recruiter,
  platform,
  name,
  date,
  salary,
  email,
  status,
  candidateStatus,
  onChangeCandidateStatus
}) => (
  <>
    <th scope="row">{idx + 1}</th>
    <td>{recruiter !== null && recruiter}</td>
    <td>{platform !== null && platform}</td>
    <td>
      <Link to={`/candidates/${id}`}>{name}</Link>
    </td>
    <td>{moment(date).format("DD.MM.YY")}</td>
    <td>{salary}</td>
    <td>{email}</td>
    <td style={{ minWidth: "9rem" }}>
      <Select
        defaultValue={candidateStatus.find(
          candidateStatus => candidateStatus.label === status
        )}
        options={candidateStatus}
        onChange={value => {
          const content = {
            id,
            company_id,
            value
          };
          onChangeCandidateStatus(content);
        }}
      />
    </td>
  </>
);

CompanyProfileCandidatesTableRow.propTypes = {
  idx: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  company_id: PropTypes.number.isRequired,
  recruiter: PropTypes.string,
  platform: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  email: PropTypes.string,
  status: PropTypes.string,
  candidateStatus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChangeCandidateStatus: PropTypes.func.isRequired
};

CompanyProfileCandidatesTableRow.defaultProps = {
  recruiter: "",
  platforms: "",
  name: "",
  date: "",
  salary: null,
  email: "",
  status: ""
};

export default CompanyProfileCandidatesTableRow;
