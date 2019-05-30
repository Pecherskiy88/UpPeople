import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";

export default class CompaniesForm extends Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired
  };

  state = {
    name: "",
    email: "",
    skype: "",
    phone: ""
  };

  handleChange = ({ target: { name, value } }) => {
    const { onFilter } = this.props;

    this.setState(
      {
        [name]: value
      },
      () => onFilter(this.state)
    );
  };

  render() {
    const { name, email, skype, phone } = this.state;

    return (
      <Form>
        <Row>
          <Col lg={3}>
            <FormGroup>
              <Input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={this.handleChange}
              />
              <i
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "1.75rem"
                }}
                className="fa fa-building-o"
              />
            </FormGroup>
          </Col>
          <Col lg={3}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <i
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "1.75rem"
                }}
                className="fa fa-envelope-o"
              />
            </FormGroup>
          </Col>
          <Col lg={3}>
            <FormGroup>
              <Input
                type="text"
                name="skype"
                value={skype}
                placeholder="Skype"
                onChange={this.handleChange}
              />
              <i
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "1.75rem"
                }}
                className="fa fa-skype"
              />
            </FormGroup>
          </Col>
          <Col lg={3}>
            <FormGroup>
              <Input
                type="text"
                name="phone"
                value={phone}
                placeholder="Phone"
                onChange={this.handleChange}
              />
              <i
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "1.75rem"
                }}
                className="fa fa-phone"
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
