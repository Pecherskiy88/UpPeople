// Core
import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";

const ListCandidates = ({ candidates }) => {
  const candidatesList =
    candidates.length > 0 ? (
      candidates.map(item => (
        <ListGroupItem
          key={item.candId}
          tag="a"
          href={`#/candidates/${item.candId}`}
        >
          {item.Review}
        </ListGroupItem>
      ))
    ) : (
      <p style={{ textAlign: "center" }}>
        There are no candidates who match{" "}
        <span role="img" aria-label="confused face">
          😕
        </span>
      </p>
    );

  return <ListGroup>{candidatesList}</ListGroup>;
};

ListCandidates.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      candId: PropTypes.number.isRequired,
      Review: PropTypes.string
    })
  )
};

ListCandidates.defaultProps = {
  candidates: []
};

export default ListCandidates;
