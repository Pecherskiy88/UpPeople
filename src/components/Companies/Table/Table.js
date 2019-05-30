// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "reactstrap";
// Components
import CompaniesTableRow from "./Row";
import PaginationBackend from "../../shared/PaginationBackend";

const CompaniesTable = ({
  companies,
  pageSize,
  totalItems,
  totalPages,
  currentPage,
  onChangePage
}) => {
  const companiesJSX =
    companies.length > 0 &&
    companies.map((company, idx) => (
      <tr key={company.id}>
        <CompaniesTableRow idx={idx} {...company} />
      </tr>
    ));

  return (
    <>
      <Table style={{ background: "var(--white)" }} responsive hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Logo</th>
            <th scope="col">Email</th>
            <th scope="col">Skype</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>{companiesJSX}</tbody>
      </Table>
      {companies.length > 0 ? (
        <Row>
          <Col>
            <PaginationBackend
              items={companies}
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

CompaniesTable.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      logo: PropTypes.string,
      email: PropTypes.string,
      skype: PropTypes.string,
      phone: PropTypes.string
    })
  ),
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func
};

CompaniesTable.defaultProps = {
  companies: [],
  pageSize: null,
  totalItems: null,
  totalPages: null,
  onChangePage: () => null
};

export default CompaniesTable;
