// Core
import React, { Component } from "react";
import { Col, Row } from "reactstrap";
// Components
import FreelancerFilterVacanciesForm from "../FilterVacanciesForm";
import FreelancerVacanciesForm from "../VacanciesForm";
// Instruments
import { isEmpty } from "../../../utils/selectors";
import {
  getVacanciesForFreelancer,
  addVacanciesForFreelancer,
  deleteVacanciesFromFreelancer,
  filterFreelancerVacancies
} from "../../../utils/api/freelancer";
import { getOptionsForSelects } from "../../../utils/api";

export default class VacanciesFormContainer extends Component {
  state = {
    vacancies: {},
    options: [],
    filterVacancies: {
      selectPlatforms: [],
      selectSeniorities: [],
      selectCompanies: []
    }
  };

  componentDidMount() {
    const { id } = this.props;

    getVacanciesForFreelancer(id).then(vacancies => {
      this.setState({
        vacancies
      });
    });

    getOptionsForSelects().then(options =>
      this.setState({
        options
      })
    );
  }

  filterVacancies = filter => {
    const { id } = this.props;
    const { filterVacancies } = this.state;

    this.setState(
      {
        filterVacancies: {
          ...filterVacancies,
          ...filter
        }
      },
      () => {
        const { filterVacancies } = this.state;

        filterFreelancerVacancies(id, filterVacancies).then(vacancies => {
          this.setState({
            vacancies
          });
        });
      }
    );
  };

  addVacancy = vacanciesToAdd =>
    addVacanciesForFreelancer(this.props.id, vacanciesToAdd);

  deleteVacancy = vacanciesToDelete =>
    deleteVacanciesFromFreelancer(this.props.id, vacanciesToDelete);

  render() {
    const {
      vacancies: { allVacancies, freelancerVacancies },
      options: { platforms, seniorities, companies }
    } = this.state;
    const { onRequestClose } = this.props;

    const renderFreelancerVacancies =
      freelancerVacancies !== undefined && freelancerVacancies.length > 0 ? (
        <FreelancerVacanciesForm
          vacancies={freelancerVacancies}
          formTitle="Freelancer's vacancies"
          btnText="Delete vacancy"
          onSubmit={this.deleteVacancy}
          onRequestClose={onRequestClose}
        />
      ) : (
        <p style={{ color: "var(--primary)", textAlign: "center" }}>
          There are no freelancer's vacancies matching your filter!
        </p>
      );

    return (
      <>
        <Row>
          <Col>
            <FreelancerFilterVacanciesForm
              platforms={platforms}
              seniorities={seniorities}
              companies={companies}
              onFilter={this.filterVacancies}
            />
          </Col>
        </Row>
        {!isEmpty(this.state.vacancies) && (
          <Row>
            <Col sm={12} md={6} lg={6}>
              {allVacancies.length > 0 ? (
                <FreelancerVacanciesForm
                  vacancies={allVacancies}
                  onSubmit={this.addVacancy}
                  onRequestClose={onRequestClose}
                />
              ) : (
                <p style={{ color: "var(--primary)", textAlign: "center" }}>
                  There are no vacancies matching your filter!
                </p>
              )}
            </Col>
            <Col sm={12} md={6} lg={6}>
              {renderFreelancerVacancies}
            </Col>
          </Row>
        )}
      </>
    );
  }
}
