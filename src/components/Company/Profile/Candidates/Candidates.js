// Core
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
// Components
import CompanyProfileCandidatesForm from "./Form";
import CompanyProfileCandidatesTable from "./Table";

const CompanyProfileCandidates = ({
  candidatesData: {
    candidates,
    candidatesCount,
    totalPages,
    perPage,
    currentPage,
    candidateStatus,
    platform
  },
  onChangePage,
  onFilterCandidates,
  onChangeCandidateStatus
}) => (
  <>
    <Row>
      <Col xl={12}>
        <CompanyProfileCandidatesForm
          candidateStatus={candidateStatus}
          platform={platform}
          onFilterCandidates={onFilterCandidates}
        />
      </Col>
    </Row>
    <Row>
      <Col xl={12}>
        <CompanyProfileCandidatesTable
          candidates={candidates}
          candidateStatus={candidateStatus}
          totalItems={candidatesCount}
          totalPages={totalPages}
          pageSize={perPage}
          currentPage={currentPage}
          onChangePage={onChangePage}
          onChangeCandidateStatus={onChangeCandidateStatus}
        />
      </Col>
    </Row>
  </>
);

CompanyProfileCandidates.propTypes = {
  candidatesData: PropTypes.shape({
    candidates: PropTypes.arrayOf(PropTypes.shape({})),
    candidatesCount: PropTypes.number,
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
    candidateStatus: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }),
  onChangePage: PropTypes.func,
  onFilterCandidates: PropTypes.func.isRequired,
  onChangeCandidateStatus: PropTypes.func.isRequired
};

CompanyProfileCandidates.defaultProps = {
  candidatesData: {},
  onChangePage: () => null
};

export default CompanyProfileCandidates;
