// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";

const Contact = ({ name, email, phone, skype }) => (
  <ListGroup style={{ margin: 0, padding: 0, listStyle: "none" }} flush>
    <ListGroupItem>
      <Row style={{ flexWrap: "nowrap" }}>
        <Col xs={1} sm={1} md={2} lg={2}>
          <i className="icon-user icons font-lg" />
        </Col>
        <Col xs={11} sm={11} md={10} lg={10}>
          {name}
        </Col>
      </Row>
    </ListGroupItem>
    <ListGroupItem>
      <Row style={{ flexWrap: "nowrap" }}>
        <Col xs={1} sm={1} md={2} lg={2}>
          <i className="icon-envelope icons font-lg" />
        </Col>
        <Col xs={11} sm={11} md={10} lg={10}>
          {email}
        </Col>
      </Row>
    </ListGroupItem>
    <ListGroupItem>
      <Row style={{ flexWrap: "nowrap" }}>
        <Col xs={1} sm={1} md={2} lg={2}>
          <i className="icon-phone icons font-lg" />
        </Col>
        <Col xs={11} sm={11} md={10} lg={10}>
          {phone}
        </Col>
      </Row>
    </ListGroupItem>
    <ListGroupItem>
      <Row style={{ flexWrap: "nowrap" }}>
        <Col xs={1} sm={1} md={2} lg={2}>
          <i className="icon-social-skype icons font-lg" />
        </Col>
        <Col xs={11} sm={11} md={10} lg={10}>
          {skype}
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

Contact.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  skype: PropTypes.string
};

Contact.defaultProps = {
  name: "",
  email: "",
  phone: "",
  skype: ""
};

export default Contact;
