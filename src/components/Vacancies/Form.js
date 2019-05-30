// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, FormGroup, Row } from "reactstrap";
// Components
import Select from "../shared/Select";

export default class VacanciesForm extends Component {
  static propTypes = {
    userRole: PropTypes.number.isRequired,
    platform: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    seniority: PropTypes.arrayOf(
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
    vacancyStatus: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    onFilter: PropTypes.func.isRequired
  };

  state = {
    selectPlatforms: [],
    selectSeniorities: [],
    selectCandidateStatus: [],
    selectStatuses: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { vacancyStatus } = this.props;
    const { selectStatuses } = this.state;

    if (prevProps.vacancyStatus.length === 0) {
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

  handlePlatformChange = value => {
    const { onFilter } = this.props;

    this.setState(
      {
        selectPlatforms: value
      },
      () => onFilter(this.state)
    );
  };

  handleSeniorityChange = value => {
    const { onFilter } = this.props;

    this.setState(
      {
        selectSeniorities: value
      },
      () => onFilter(this.state)
    );
  };

  handleCandidateStatusChange = value => {
    const { onFilter } = this.props;

    this.setState(
      {
        selectCandidateStatus: value
      },
      () => onFilter(this.state)
    );
  };

  handleVacancyStatusChange = value => {
    const { onFilter } = this.props;

    this.setState(
      {
        selectStatuses: value
      },
      () => {
        console.log("this.state.selectStatuses: ", this.state.selectStatuses);

        onFilter(this.state);
      }
    );
  };

  render() {
    const { platform, seniority, candidateStatus, vacancyStatus } = this.props;
    const {
      selectPlatforms,
      selectSeniorities,
      selectCandidateStatus,
      selectStatuses
    } = this.state;
    const { userRole } = this.props;
    console.log("[VacanciesForm] props: ", this.props);
    return (
      <Form>
        <Row>
          <Col lg={3} md={12}>
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
          <Col lg={3} md={12}>
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
          {userRole !== 4 ? (
            <>
              <Col lg={3} md={12}>
                <FormGroup>
                  <Select
                    isMulti
                    value={selectCandidateStatus}
                    options={candidateStatus}
                    placeholder="Candidate status"
                    onChange={this.handleCandidateStatusChange}
                  />
                </FormGroup>
              </Col>
              <Col lg={3} md={12}>
                <FormGroup>
                  <Select
                    isMulti
                    value={selectStatuses}
                    options={vacancyStatus}
                    placeholder="Vacancy status"
                    onChange={this.handleVacancyStatusChange}
                  />
                </FormGroup>
              </Col>
            </>
          ) : null}
        </Row>
      </Form>
    );
  }
}
