// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Button, Form, FormGroup, Input, Row } from "reactstrap";
// Components
import Select from "../../../shared/Select";

export default class CompanyProfileVacanciesForm extends Component {
  static propTypes = {
    platform: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    seniority: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    vacancyStatus: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    onFilterVacancies: PropTypes.func.isRequired
  };

  state = {
    inputDate: "",
    selectStatuses: [],
    selectPlatforms: [],
    selectSeniorities: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { vacancyStatus } = this.props;
    const { selectStatuses } = this.state;

    if (vacancyStatus) {
      if (vacancyStatus.length !== prevProps.vacancyStatus.length) {
        const selectStatuses = vacancyStatus.map(status =>
          status.id === 0 || status.id === 1 ? status : null
        );
        this.setState({
          selectStatuses
        });
      } else if (selectStatuses.length !== prevState.selectStatuses.length) {
        this.setState({
          selectStatuses
        });
      }
    }
  }

  handleStatusChange = value => {
    const { onFilterVacancies } = this.props;
    this.setState(
      {
        selectStatuses: value
      },
      () => onFilterVacancies(this.state)
    );
  };

  handlePlatformChange = value => {
    const { onFilterVacancies } = this.props;
    this.setState(
      {
        selectPlatforms: value
      },
      () => onFilterVacancies(this.state)
    );
  };

  handleSeniorityChange = value => {
    const { onFilterVacancies } = this.props;
    this.setState(
      {
        selectSeniorities: value
      },
      () => onFilterVacancies(this.state)
    );
  };

  handleInputDateChange = ({ target: { value } }) => {
    const { onFilterVacancies } = this.props;

    this.setState(
      {
        inputDate: value
      },
      () => onFilterVacancies(this.state)
    );
  };

  render() {
    const {
      inputDate,
      selectStatuses,
      selectPlatforms,
      selectSeniorities
    } = this.state;
    const { platform, seniority, vacancyStatus } = this.props;

    return (
      <Form>
        <Row>
          <Col lg={1} md={12}>
            <FormGroup>
              <Link to={`/new-vacancy`}>
                <Button color="success">Add</Button>
              </Link>
            </FormGroup>
          </Col>
          <Col lg={5} md={12}>
            <FormGroup>
              <Select
                isMulti
                value={selectStatuses}
                options={vacancyStatus}
                placeholder="Vacancy statuses"
                onChange={this.handleStatusChange}
              />
            </FormGroup>
          </Col>
          <Col lg={2} md={12}>
            <FormGroup>
              <Input
                id="date"
                type="date"
                name="date"
                value={inputDate}
                onChange={this.handleInputDateChange}
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
                value={selectSeniorities}
                options={seniority}
                placeholder="Seniority"
                onChange={this.handleSeniorityChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
