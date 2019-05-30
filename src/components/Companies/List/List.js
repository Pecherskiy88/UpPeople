// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
// Components
import CompaniesListItem from "./Item";
import PaginationBackend from "../../shared/PaginationBackend";

const CompaniesList = ({
  companies,
  pageSize,
  totalItems,
  totalPages,
  currentPage,
  onChangePage
}) => {
  const companiesJSX =
    companies.length > 0 ? (
      companies.map(company => (
        <Col
          xs="6"
          sm="4"
          md="3"
          lg="2"
          key={company.id}
          style={{ padding: "0 0.5rem" }}
        >
          <CompaniesListItem {...company} />
        </Col>
      ))
    ) : (
      <Col>
        <h3 style={{ color: "var(--primary)", textAlign: "center" }}>
          There are no companies matching your filter!
        </h3>
      </Col>
    );

  return (
    <>
      <Row>{companiesJSX}</Row>
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

CompaniesList.propTypes = {
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

CompaniesList.defaultProps = {
  companies: [],
  pageSize: null,
  totalItems: null,
  totalPages: null,
  onChangePage: () => null
};

export default CompaniesList;
