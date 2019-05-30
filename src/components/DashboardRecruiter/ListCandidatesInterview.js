// Core
import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

const ListCandidatesInterview = ({ candidates }) => {
  const candidatesList =
    candidates.length > 0 ? (
      candidates.map((item, idx) => (
        <ListGroupItem key={idx}>{item.interview}</ListGroupItem>
      ))
    ) : (
      <p style={{ textAlign: "center" }}>
        There are no candidates scheduled on the interview today{" "}
        <span role="img" aria-label="confused face">
          😕
        </span>
      </p>
    );

  return <ListGroup>{candidatesList}</ListGroup>;
};

ListCandidatesInterview.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      interview: PropTypes.string.isRequired
    })
  )
};

ListCandidatesInterview.defaultProps = {
  candidates: []
};

export default ListCandidatesInterview;
