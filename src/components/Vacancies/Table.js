// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "reactstrap";
// Components
import VacanciesTableRow from "./TableRow";
import LocaleSelector from "../LocaleSelector";
import PaginationBackend from "../shared/PaginationBackend";

const VacanciesTable = ({
  userRole,
  vacancies,
  vacancyStatus,
  pageSize,
  totalItems,
  totalPages,
  currentPage,
  onChangePage,
  onSort,
  onDeleteVacancy,
  onChangeVacancyStatus
}) => {
  const vacanciesJSX =
    vacancies.length > 0 ? (
      vacancies.map((vacancy, idx) => (
        <tr key={vacancy.id}>
          <VacanciesTableRow
            idx={idx}
            {...vacancy}
            userRole={userRole}
            vacancyStatus={vacancyStatus}
            onDeleteVacancy={onDeleteVacancy}
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
      <Table style={{ background: "var(--white)" }} responsive hover>
        <thead>
          <tr>
            <LocaleSelector onSort={onSort} />
            <th scope="col">Action</th>
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

VacanciesTable.propTypes = {
  userRole: PropTypes.number.isRequired,
  vacancies: PropTypes.arrayOf(PropTypes.shape({})),
  vacancyStatus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
  onSort: PropTypes.func,
  onDeleteVacancy: PropTypes.func.isRequired,
  onChangeVacancyStatus: PropTypes.func.isRequired
};

VacanciesTable.defaultProps = {
  vacancies: [],
  pageSize: null,
  totalItems: null,
  totalPages: null,
  onChangePage: () => null,
  onSort: () => null
};

export default VacanciesTable;
