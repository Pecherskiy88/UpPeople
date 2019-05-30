// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
// Components
import CompanyProfileVacanciesForm from "./Form";
import CompanyProfileVacanciesTable from "./Table";

const CompanyProfileVacancies = ({
  vacanciesData: {
    vacancies,
    vacanciesCount,
    totalPages,
    perPage,
    currentPage,
    vacancyStatus,
    platform,
    seniority
  },
  onChangePage,
  onFilterVacancies,
  onChangeVacancyStatus
}) => (
  <>
    <Row>
      <Col xl={12}>
        <CompanyProfileVacanciesForm
          vacancyStatus={vacancyStatus}
          platform={platform}
          seniority={seniority}
          onFilterVacancies={onFilterVacancies}
        />
      </Col>
    </Row>
    <Row>
      <Col xl={12}>
        <CompanyProfileVacanciesTable
          vacancies={vacancies}
          vacancyStatus={vacancyStatus}
          totalItems={vacanciesCount}
          totalPages={totalPages}
          pageSize={perPage}
          currentPage={currentPage}
          onChangePage={onChangePage}
          onChangeVacancyStatus={onChangeVacancyStatus}
        />
      </Col>
    </Row>
  </>
);

CompanyProfileVacancies.propTypes = {
  vacanciesData: PropTypes.shape({
    vacancies: PropTypes.arrayOf(PropTypes.shape({})),
    vacanciesCount: PropTypes.number,
    totalPages: PropTypes.number,
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    platform: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    seniority: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    vacancyStatus: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }),
  onChangePage: PropTypes.func,
  onFilterVacancies: PropTypes.func.isRequired,
  onChangeVacancyStatus: PropTypes.func.isRequired
};

CompanyProfileVacancies.defaultProps = {
  vacanciesData: {},
  onChangePage: () => null
};

export default CompanyProfileVacancies;
