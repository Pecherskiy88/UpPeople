// Core
import React from "react";
import PropTypes from "prop-types";
// Components
import CompanyProfileCommentsList from "./List";
import CompanyProfileCommentsForm from "./Form";
// import { AccountConsumer } from "../../../../providers/AccountProvider";

const CompanyProfileComments = ({
  comments,
  onAddComment,
  onDeleteComment
}) => (
  // <AccountConsumer>
  //   {context =>
  //     console.log(context) || (
  <>
    <CompanyProfileCommentsList
      comments={comments}
      onDeleteComment={onDeleteComment}
    />
    <CompanyProfileCommentsForm onAddComment={onAddComment} />
  </>
  //     )
  //   }
  // </AccountConsumer>
);

CompanyProfileComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      time_create: PropTypes.string,
      comments: PropTypes.string
    })
  ),
  onAddComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired
};

CompanyProfileComments.defaultProps = {
  comments: []
};

export default CompanyProfileComments;
