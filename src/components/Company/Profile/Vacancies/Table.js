// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "reactstrap";
// Components
import CompanyProfileVacanciesTableRow from "./TableRow";
import LocaleSelector from "../../../LocaleSelector";
import PaginationBackend from "../../../shared/PaginationBackend";

const CompanyProfileVacanciesTable = ({
  vacancies,
  vacancyStatus,
  totalItems,
  totalPages,
  pageSize,
  currentPage,
  onChangePage,
  onSort,
  onChangeVacancyStatus
}) => {
  const vacanciesJSX =
    vacancies.length > 0 ? (
      vacancies.map((vacancy, idx) => (
        <tr key={vacancy.id}>
          <CompanyProfileVacanciesTableRow
            idx={idx}
            {...vacancy}
            vacancyStatus={vacancyStatus}
            onChangeVacancyStatus={onChangeVacancyStatus}
          />
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
    <>
      <Table responsive hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <LocaleSelector onSort={onSort} />
            <th scope="col">Status</th>
            {/* <th scope="col">Action</th> */}
          </tr>
        </thead>
        <tbody>{vacanciesJSX}</tbody>
      </Table>
      {vacancies.length > 0 ? (
        <Row>
          <Col>
            <PaginationBackend
              items={vacancies}
              totalItems={totalItems}
              pageSize={pageSize}
              totalPages={totalPages}
              initialPage={currentPage}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : null}
    </>
  );
};

CompanyProfileVacanciesTable.propTypes = {
  vacancies: PropTypes.arrayOf(PropTypes.shape({})),
  vacancyStatus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onSort: PropTypes.func,
  onChangeVacancyStatus: PropTypes.func.isRequired
};

CompanyProfileVacanciesTable.defaultProps = {
  vacancies: [],
  totalItems: null,
  totalPages: null,
  perPage: null,
  currentPage: null,
  onChangePage: () => null,
  onSort: () => null
};

export default CompanyProfileVacanciesTable;
