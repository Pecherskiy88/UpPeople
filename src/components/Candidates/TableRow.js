// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

const CandidateTableRow = ({
  id,
  date,
  name,
  email,
  platform,
  salary,
  companies,
  recruiter,
  isOpen,
  open,
  close
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

  return (
    <>
      <td>
        {isOpen ? (
          <i
            className="icon-close icons font-xl"
            style={{ color: "var(--red)", cursor: "pointer" }}
            onClick={close}
          />
        ) : (
          <i
            className="icon-plus icons font-xl"
            style={{ color: "var(--green)", cursor: "pointer" }}
            onClick={open}
          />
        )}
      </td>
      <td>{moment(date).format("DD.MM.YY")}</td>
      <td>{platform}</td>
      <td>
        <Link to={`/candidates/${id}`}>{name}</Link>
      </td>
      <td>{email}</td>
      <td>{salary}</td>
      <td>
        {companies &&
          companies.split(";").map((company, idx) => {
            const parsedCompany = JSON.parse(company);
            return (
              <Link
                to={`/companies/${parsedCompany.id}`}
                key={`${idx}-${id}-${parsedCompany.id}`}
              >
                <Badge color={getBadge(parsedCompany.vacStat)}>
                  {parsedCompany.name}
                </Badge>
              </Link>
            );
          })}
      </td>
      <td>{recruiter}</td>
    </>
  );
};

CandidateTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  platform: PropTypes.string,
  salary: PropTypes.string,
  companies: PropTypes.string,
  recruiter: PropTypes.string,
  open: PropTypes.func,
  close: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
};

CandidateTableRow.defaultProps = {
  date: "",
  name: "",
  email: "",
  platform: "",
  salary: "",
  companies: "",
  recruiter: "",
  open: () => null,
  close: () => null
};

export default CandidateTableRow;
