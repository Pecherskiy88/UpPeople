// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
import VacancyCreateForm from "./Form";
// HOC
import withOptionsForSelects from "../../hoc/withOptionsForSelects";
// Instruments
import { createNewVacancy } from "../../../utils/api/vacancy";

class VacancyCreate extends Component {
  static propTypes = {
    options: PropTypes.shape({
      platforms: PropTypes.arrayOf(
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
      companies: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      location: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  };

  createVacancy = vacancy => {
    createNewVacancy(vacancy).then(createdVacancy => {
      const { history } = this.props;

      history.push(`/vacancies/${createdVacancy.id}`);
    });
  };

  render() {
    const { options } = this.props;
    console.log(this.props.location.state);
    return (
      <>
        <h3>New Vacancy</h3>
        <VacancyCreateForm
          options={options}
          onCreateVacancy={this.createVacancy}
          {...this.props}
        />
      </>
    );
  }
}

export default withOptionsForSelects(VacancyCreate);
