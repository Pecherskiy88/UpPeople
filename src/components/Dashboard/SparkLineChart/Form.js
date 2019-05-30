// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";

class DashboardForm extends Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired
  };

  state = {
    dateFrom: "",
    dateTo: ""
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.props.onFilter(this.state));
  };

  render() {
    const { dateFrom, dateTo } = this.state;

    return (
      <Form>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <FormGroup>
              <Input
                id="date-from"
                type="date"
                name="dateFrom"
                value={dateFrom}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <FormGroup>
              <Input
                id="date-to"
                type="date"
                name="dateTo"
                value={dateTo}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default DashboardForm;
