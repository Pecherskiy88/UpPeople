// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Row } from "reactstrap";
// Components
import Select from "../shared/Select";

export default class FreelancerFilterVacanciesForm extends Component {
  static propTypes = {
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    seniorities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ),
    onFilter: PropTypes.func
  };

  static defaultProps = {
    platforms: [],
    seniorities: [],
    companies: [],
    onFilter: () => {}
  };

  state = {
    selectPlatforms: [],
    selectSeniorities: [],
    selectCompanies: []
  };

  handlePlatformChange = value => {
    this.setState(
      {
        selectPlatforms: value
      },
      () => this.props.onFilter(this.state)
    );
  };

  handleSeniorityChange = value => {
    this.setState(
      {
        selectSeniorities: value
      },
      () => this.props.onFilter(this.state)
    );
  };

  handleCompanyChange = value => {
    this.setState(
      {
        selectCompanies: value
      },
      () => this.props.onFilter(this.state)
    );
  };

  render() {
    const { platforms, seniorities, companies } = this.props;
    const { selectPlatforms, selectSeniorities, selectCompanies } = this.state;

    return (
      <Form>
        <Row>
          <Col lg={4} md={4} sm={12}>
            <FormGroup>
              <Select
                isMulti
                value={selectPlatforms}
                options={platforms}
                placeholder="Platforms"
                onChange={this.handlePlatformChange}
              />
            </FormGroup>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <FormGroup>
              <Select
                isMulti
                value={selectSeniorities}
                options={seniorities}
                placeholder="Seniorities"
                onChange={this.handleSeniorityChange}
              />
            </FormGroup>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <FormGroup>
              <Select
                isMulti
                value={selectCompanies}
                options={companies}
                placeholder="Companies"
                onChange={this.handleCompanyChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
