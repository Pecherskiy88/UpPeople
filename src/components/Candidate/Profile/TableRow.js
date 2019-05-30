// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Badge } from "reactstrap";
// Components
import Select from "../../shared/Select";

const CandidateProfileTableRow = ({
  userRole,
  idx,
  platform,
  vacancy,
  company,
  dateUpdate,
  vacancyStatus,
  details,
  candidateId,
  selectCandidateStatus,
  onChangeCandidateStatus
}) => {
  const platformName = platform !== null ? platform.nazva : "";
  const vacancyName = vacancy !== null ? vacancy.nazva : "";
  const companyName = company !== null ? company.nazva : "";
  const status = vacancyStatus !== null ? vacancyStatus.status : "";
  const formatedDate = moment(dateUpdate).format("DD.MM.YY");

  const getBadge = status => {
    return status === "OFFER" || status === "Hired"
      ? "success"
      : status === "Hold"
      ? "secondary"
      : status === "Interview"
      ? "warning"
      : status === "Rejected" || status === "Refused"
      ? "danger"
      : status === "Review"
      ? "primary"
      : null;
  };

  return (
    <>
      <th scope="row">{idx + 1}</th>
      <td>{platformName}</td>
      <td>{vacancyName}</td>
      <td>{companyName}</td>
      <td>{formatedDate}</td>
      <td style={{ minWidth: "8rem" }}>
        {userRole !== 4 && userRole !== 5 ? (
          <Select
            defaultValue={selectCandidateStatus.find(
              candidateStatus => candidateStatus.label === status
            )}
            options={selectCandidateStatus}
            onChange={value => {
              const content = {
                id: candidateId,
                company_id: company.id,
                value
              };
              onChangeCandidateStatus(content);
            }}
          />
        ) : (
          <Badge color={getBadge(status)}>{status}</Badge>
        )}
      </td>
      <td>{details}</td>
    </>
  );
};

CandidateProfileTableRow.propTypes = {
  userRole: PropTypes.number.isRequired,
  idx: PropTypes.number,
  platform: PropTypes.shape({
    id: PropTypes.number,
    nazva: PropTypes.string
  }),
  vacancy: PropTypes.shape({
    id: PropTypes.number,
    nazva: PropTypes.string
  }),
  comapny: PropTypes.shape({
    id: PropTypes.number,
    nazva: PropTypes.string
  }),
  dateUpdate: PropTypes.string,
  vacancyStatus: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string
  }),
  details: PropTypes.string,
  candidateId: PropTypes.number.isRequired,
  selectCandidateStatus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChangeCandidateStatus: PropTypes.func
};

CandidateProfileTableRow.defaultProps = {
  idx: null,
  platform: {},
  vacancy: {},
  company: {},
  dateUpdate: "",
  vacancyStatus: {},
  details: "",
  onChangeCandidateStatus: () => {}
};

export default CandidateProfileTableRow;
