// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
// Components
import Select from "../shared/Select";

class CandidatesForm extends Component {
  static propTypes = {
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    statuses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    onFilter: PropTypes.func.isRequired
  };

  state = {
    search: "",
    dateFrom: "",
    dateTo: "",
    selectPlatforms: [],
    selectCompanies: [],
    selectStatuses: []
  };

  handleInputChange = ({ target: { name, value } }) => {
    const { onFilter } = this.props;

    this.setState({ [name]: value }, () => onFilter(this.state));
  };

  handlePlatformChange = value => {
    const { onFilter } = this.props;

    this.setState(
      {
        selectPlatforms: value
      },
      () => onFilter(this.state)
    );
  };

  handleCompanyChange = value => {
    const { onFilter } = this.props;

    this.setState(
      {
        selectCompanies: value
      },
      () => onFilter(this.state)
    );
  };

  handleStatusChange = value => {
    const { onFilter } = this.props;

    this.setState(
      {
        selectStatuses: value
      },
      () => onFilter(this.state)
    );
  };

  render() {
    const {
      search,
      dateFrom,
      dateTo,
      selectPlatforms,
      selectCompanies,
      selectStatuses
    } = this.state;
    const { platforms, companies, statuses, userRole } = this.props;

    return (
      <Form>
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Input
                id="search"
                type="text"
                name="search"
                value={search}
                placeholder="Search"
                onChange={this.handleInputChange}
              />
              <i
                className="fa fa-search"
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "1.75rem",
                  color: "var(--gray)"
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        {userRole !== 4 ? (
          <Row>
            <Col lg={2} md={12}>
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
            <Col lg={2} md={12}>
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
            <Col lg={3} md={12}>
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
            <Col lg={3} md={12}>
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
            <Col lg={2} md={12}>
              <FormGroup>
                <Select
                  isMulti
                  value={selectStatuses}
                  options={statuses}
                  placeholder="Statuses"
                  onChange={this.handleStatusChange}
                />
              </FormGroup>
            </Col>
          </Row>
        ) : null}
      </Form>
    );
  }
}

export default CandidatesForm;
