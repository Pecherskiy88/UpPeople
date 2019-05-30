// Core
import React, { Component } from "react";
// Components
import VacancyEditForm from "./Form";
// HOC
import withOptionsForSelects from "../../hoc/withOptionsForSelects";
// Instruments
import { updateVacancy, getVacancyProfile } from "../../../utils/api/vacancy";

class VacancyEdit extends Component {
  state = {
    vacancy: {
      id: null,
      date: "",
      company: {},
      platform: {},
      seniority: {},
      status: {},
      location: {},
      salary: null,
      link: "",
      description: "",
      details: ""
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getVacancyProfile(id).then(vacancy => {
      this.setState({ vacancy });
    });
  }

  editVacancy = vacancy => {
    const { id } = this.props.match.params;

    updateVacancy(id, vacancy).then(vacancy => {
      const { history } = this.props;

      history.push(`/vacancies/${vacancy.id}`);
    });
  };

  render() {
    const { vacancy } = this.state;
    const { options } = this.props;

    return (
      <>
        <h3>Edit Vacancy</h3>
        <VacancyEditForm
          options={options}
          vacancy={vacancy}
          onEditVacancy={this.editVacancy}
        />
      </>
    );
  }
}

export default withOptionsForSelects(VacancyEdit);
