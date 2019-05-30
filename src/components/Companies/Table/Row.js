// Core
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CompaniesTableRow = ({ idx, id, name, logo, email, skype, phone }) => (
  <>
    <th scope="row">{idx + 1}</th>
    <td>
      <Link to={`/companies/${id}`} style={{ color: "var(--dark)" }}>
        {name}
      </Link>
    </td>
    <td>
      <Link to={`/companies/${id}`}>
        <img height={25} src={logo} alt="logo" />
      </Link>
    </td>
    <td>{email}</td>
    <td>{skype}</td>
    <td>{phone}</td>
  </>
);

CompaniesTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  logo: PropTypes.string,
  email: PropTypes.string,
  skype: PropTypes.string,
  phone: PropTypes.string
};

CompaniesTableRow.defaultProps = {
  name: "",
  logo: "",
  email: "",
  skype: "",
  phone: ""
};

export default CompaniesTableRow;
