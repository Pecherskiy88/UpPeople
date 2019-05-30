// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
// Components
import CandidateCommentForm from "./CommentForm";
import Select from "../shared/Select";
// Instruments
import { updateCandidateStatus } from "../../utils/api/company";
import { saveCommentToCandidate } from "../../utils/api/candidate";

const CandidateExpandableTableRow = ({
  userRole,
  candId,
  candidateStatus,
  statuses
}) => {
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

  const parsedStatus = JSON.parse(candidateStatus);
  const { date, compId, compName, vacStat, commentVac } = parsedStatus;
  const comment = commentVac ? commentVac : "";

  return (
    <>
      {date !== null || compId !== null ? (
        <>
          <td>{date ? moment(date).format("DD.MM.YY") : ""}</td>
          <td>
            {userRole !== 4 ? (
              <Link to={`/companies/${compId}`}>{compName}</Link>
            ) : (
              compName
            )}
          </td>
          <td>
            {userRole !== 4 ? (
              <Select
                defaultValue={statuses.find(status => status.label === vacStat)}
                options={statuses}
                onChange={value => {
                  const content = {
                    id: candId,
                    company_id: compId,
                    value
                  };

                  updateCandidateStatus(content);
                }}
              />
            ) : (
              <Badge color={getBadge(vacStat)}>{vacStat}</Badge>
            )}
          </td>
          <td>
            {userRole !== 4 ? (
              <CandidateCommentForm
                value={comment}
                candId={candId}
                compId={compId}
                onSave={saveCommentToCandidate}
              />
            ) : (
              comment
            )}
          </td>
        </>
      ) : (
        <td colSpan="9" align="middle" valign="middle">
          There are no previous statuses on the candidate.{" "}
          <span role="img" aria-label="confused face">
            😕
          </span>
        </td>
      )}
    </>
  );
};

CandidateExpandableTableRow.propTypes = {
  userRole: PropTypes.number.isRequired,
  candId: PropTypes.number.isRequired,
  candidateStatus: PropTypes.string.isRequired,
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default CandidateExpandableTableRow;
