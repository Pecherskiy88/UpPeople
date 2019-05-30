// Core
import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
// Components
import CompanyProfileCommentsItem from "./Item";

const CompanyProfileCommentsList = ({ comments, onDeleteComment }) => {
  const commentsJSX =
    comments !== undefined &&
    comments.map(comment => (
      <ListGroupItem key={comment.id}>
        <CompanyProfileCommentsItem
          {...comment}
          onDeleteComment={onDeleteComment}
        />
      </ListGroupItem>
    ));

  const renderContent =
    comments.length > 0 ? (
      <ListGroup style={{ marginBottom: "1rem" }}>{commentsJSX}</ListGroup>
    ) : (
      <p style={{ color: "var(--secondary)", textAlign: "center" }}>
        There are no comments yet{" "}
        <span role="img" aria-label="crazy face">
          😜
        </span>{" "}
        Please, add a new one.
      </p>
    );

  return <>{renderContent}</>;
};

CompanyProfileCommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      time_create: PropTypes.string,
      comments: PropTypes.string
    })
  ),
  onDeleteComment: PropTypes.func.isRequired
};

CompanyProfileCommentsList.defaultProps = {
  comments: []
};

export default CompanyProfileCommentsList;
