// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

const ActivityTableRow = ({
  idx,
  date,
  text,
  vacId,
  vac,
  compId,
  compName
}) => (
  <>
    <td>{idx + 1}</td>
    <td>{moment(date).format("Do MMMM YYYY, h:mm:ss a")}</td>
    <td>{text}</td>
    <td>
      <Link to={`vacancies/${vacId}`}>{vac}</Link>
    </td>
    <td>
      <Link to={`companies/${compId}`}>{compName}</Link>
    </td>
  </>
);

ActivityTableRow.propTypes = {
  idx: PropTypes.number.isRequired,
  date: PropTypes.string,
  text: PropTypes.string,
  vac: PropTypes.string,
  compName: PropTypes.string
};

ActivityTableRow.defaultProps = {
  date: "",
  text: "",
  vac: "",
  compName: ""
};

export default ActivityTableRow;
