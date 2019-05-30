// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "reactstrap";
// Components
import CandidateFromFreelancerTableRow from "./TableRow";
import CandidateExpandableTableRow from "../ExpandableTableRow";
import LocaleSelector from "../../LocaleSelector";
import PaginationBackend from "../../shared/PaginationBackend";
// HOC
import OpenClose from "../../../render_prop/OpenClose";

const CandidatesFromFreelancersTable = ({
  candidates,
  statuses,
  pageSize,
  totalItems,
  totalPages,
  currentPage,
  onChangePage,
  onSendResume,
  onRejectCandidate,
  onSort
}) => {
  const candidatesJSX =
    candidates.length > 0 ? (
      candidates.map((candidate, idx) => (
        <OpenClose
          key={candidate.id}
          render={(isOpen, open, close) =>
            isOpen ? (
              <>
                <tr key={candidate.id}>
                  <CandidateFromFreelancerTableRow
                    idx={idx}
                    {...candidate}
                    isOpen={isOpen}
                    close={close}
                    onSendResume={onSendResume}
                    onRejectCandidate={onRejectCandidate}
                  />
                </tr>
                {candidate.status &&
                  candidate.status.split(";").map(status => (
                    <tr key={candidate.id}>
                      <td colSpan="8">
                        <Table style={{ background: "var(--white)" }} size="sm">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Company</th>
                              <th>Status</th>
                              <th>Comment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <CandidateExpandableTableRow
                                candId={candidate.id}
                                candidateStatus={status}
                                statuses={statuses}
                              />
                            </tr>
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                  ))}
              </>
            ) : (
              <tr key={candidate.id}>
                <CandidateFromFreelancerTableRow
                  idx={idx}
                  {...candidate}
                  isOpen={isOpen}
                  open={open}
                  onSendResume={onSendResume}
                  onRejectCandidate={onRejectCandidate}
                />
              </tr>
            )
          }
        />
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
            <th>+/-</th>
            <LocaleSelector onSort={onSort} />
            <th>Action</th>
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

CandidatesFromFreelancersTable.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      platform: PropTypes.string,
      salary: PropTypes.string,
      companies: PropTypes.string,
      recruiter: PropTypes.string
    })
  ),
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  onSendResume: PropTypes.func.isRequired,
  onRejectCandidate: PropTypes.func.isRequired,
  onSort: PropTypes.func
};

CandidatesFromFreelancersTable.defaultProps = {
  candidates: [],
  currentPage: null,
  pageSize: null,
  totalItems: null,
  totalPages: null,
  onSort: () => null
};

export default CandidatesFromFreelancersTable;
