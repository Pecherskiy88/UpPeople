// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
// Components
import Select from "../../../shared/Select";

export default class CompanyProfileCandidatesForm extends Component {
  static propTypes = {
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
    ).isRequired,
    onFilterCandidates: PropTypes.func.isRequired
  };

  state = {
    name: "",
    email: "",
    date: "",
    selectPlatforms: [],
    selectStatuses: []
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const { onFilterCandidates } = this.props;

    this.setState({ [name]: value }, () => onFilterCandidates(this.state));
  };

  handlePlatformChange = value => {
    const { onFilterCandidates } = this.props;

    this.setState({ selectPlatforms: value }, () =>
      onFilterCandidates(this.state)
    );
  };

  handleStatusChange = value => {
    const { onFilterCandidates } = this.props;

    this.setState({ selectStatuses: value }, () =>
      onFilterCandidates(this.state)
    );
  };

  render() {
    const { name, email, date, selectPlatforms, selectStatuses } = this.state;
    const { platform, candidateStatus } = this.props;

    return (
      <Form>
        <Row>
          <Col lg={3} md={12}>
            <FormGroup>
              <Input
                id="name"
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={this.handleInputChange}
              />
              <i
                className="fa fa-user-o"
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "1.75rem"
                }}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={12}>
            <FormGroup>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleInputChange}
              />
              <i
                className="fa fa-envelope-o"
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "1.75rem"
                }}
              />
            </FormGroup>
          </Col>
          <Col lg={2} md={12}>
            <FormGroup>
              <Input
                id="date"
                type="date"
                name="date"
                value={date}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col lg={2} md={12}>
            <FormGroup>
              <Select
                isMulti
                value={selectPlatforms}
                options={platform}
                placeholder="Platforms"
                onChange={this.handlePlatformChange}
              />
            </FormGroup>
          </Col>
          <Col lg={2} md={12}>
            <FormGroup>
              <Select
                isMulti
                value={selectStatuses}
                options={candidateStatus}
                placeholder="Statuses"
                onChange={this.handleStatusChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
