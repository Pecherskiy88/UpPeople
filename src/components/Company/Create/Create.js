// Core
import React, { Component } from "react";
// Components
import CompanyCreateForm from "./Form";
// Instruments
import { createNewCompany } from "../../../utils/api/company";

export default class CompanyCreate extends Component {
  createCompany = company => {
    createNewCompany(company).then(createdCompany => {
      const { history } = this.props;

      history.push(`/companies/${createdCompany.id}`);
    });
  };

  render() {
    return (
      <>
        <h3>New Company</h3>
        <CompanyCreateForm onCreateCompany={this.createCompany} />
      </>
    );
  }
}
