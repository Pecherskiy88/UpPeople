// Core
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "reactstrap";
// Components
import ModalToDelete from "../../../shared/ModalToDelete";
// Context
import { ModalConsumer } from "../../../../providers/ModalProvider";

const CompanyProfileCommentsItem = ({
  id,
  name,
  time_create,
  comments,
  onDeleteComment
}) => (
  <Row>
    <Col xs={2} sm={1} md={1} lg={1}>
      <div
        style={{
          width: 40,
          height: 40,
          background: "var(--secondary)",
          borderRadius: "50%"
        }}
      />
    </Col>
    <Col xs={10} sm={11} md={11} lg={11}>
      <Link to="#">{name}</Link>
      <p style={{ marginBottom: 0 }}>{comments}</p>
      <p style={{ fontSize: 12, color: "var(--secondary)" }}>{time_create}</p>
    </Col>
    <ModalConsumer>
      {({ showModal, hideModal }) => (
        <Button
          title="delete"
          style={{
            position: "absolute",
            right: "1rem",
            padding: 0,
            backgroundColor: "transparent",
            borderColor: "transparent"
          }}
          onClick={() =>
            showModal(ModalToDelete, {
              isOpenModal: true,
              title: "Delete comment",
              name: `${name} comment`,
              onDelete: () => {
                onDeleteComment(id);
                hideModal();
              }
            })
          }
        >
          <i className="icon-trash icons font-lg" color="gray" />
        </Button>
      )}
    </ModalConsumer>
  </Row>
);

CompanyProfileCommentsItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  time_create: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  onDeleteComment: PropTypes.func.isRequired
};

export default CompanyProfileCommentsItem;
