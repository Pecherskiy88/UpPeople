// Core
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
// Components
import Select from "../../../shared/Select";

const CompanyProfileVacanciesTableRow = ({
  idx,
  id,
  platform,
  seniority,
  details,
  date,
  status,
  vacancyStatus,
  onChangeVacancyStatus
}) => {
  const createHTMLMarkup = () => {
    return { __html: details };
  };

  return (
    <>
      <th scope="row">{idx + 1}</th>
      <td>
        <Link to={`/vacancies/${id}`}>{platform !== null && platform}</Link>
      </td>
      <td>{seniority !== null && seniority}</td>
      <td>
        <div dangerouslySetInnerHTML={createHTMLMarkup()} />
      </td>
      <td>{moment(date).format("DD.MM.YY")}</td>
      <td style={{ minWidth: "9rem" }}>
        <Select
          defaultValue={vacancyStatus.find(
            vacancyStatus => vacancyStatus.label === status
          )}
          options={vacancyStatus}
          onChange={value => {
            const content = {
              id,
              value
            };
            onChangeVacancyStatus(content);
          }}
        />
      </td>
    </>
  );
};

CompanyProfileVacanciesTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  platform: PropTypes.string,
  seniority: PropTypes.string,
  details: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  vacancyStatus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChangeVacancyStatus: PropTypes.func.isRequired
};

CompanyProfileVacanciesTableRow.defaultProps = {
  platform: "",
  seniority: "",
  details: "",
  date: "",
  status: ""
};

export default CompanyProfileVacanciesTableRow;
