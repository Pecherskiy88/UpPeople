// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "reactstrap";
// Components
import LocaleSelector from "../../../LocaleSelector";
import CompanyProfileCandidatesTableRow from "./TableRow";
import PaginationBackend from "../../../shared/PaginationBackend";

const CompanyProfileCandidatesTable = ({
  candidates,
  candidateStatus,
  totalItems,
  totalPages,
  pageSize,
  currentPage,
  onChangePage,
  onSort,
  onChangeCandidateStatus
}) => {
  const candidatesJSX =
    candidates.length > 0 ? (
      candidates.map((candidate, idx) => (
        <tr key={candidate.id}>
          <CompanyProfileCandidatesTableRow
            idx={idx}
            {...candidate}
            candidateStatus={candidateStatus}
            onChangeCandidateStatus={onChangeCandidateStatus}
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
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>{candidatesJSX}</tbody>
      </Table>
      {candidates.length > 0 ? (
        <Row>
          <Col>
            <PaginationBackend
              items={candidates}
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

CompanyProfileCandidatesTable.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      recruiter: PropTypes.string,
      platform: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.string,
      salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      email: PropTypes.string,
      status: PropTypes.string
    })
  ),
  candidateStatus: PropTypes.arrayOf(
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
  onChangeCandidateStatus: PropTypes.func.isRequired
};

CompanyProfileCandidatesTable.defaultProps = {
  candidates: [],
  totalItems: null,
  totalPages: null,
  perPage: null,
  currentPage: null,
  onChangePage: () => null,
  onSort: () => null
};

export default CompanyProfileCandidatesTable;
