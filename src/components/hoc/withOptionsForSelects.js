// Core
import React, { Component } from "react";
// Instruments
import { getOptionsForSelects } from "../../utils/api";

const withOptionsForSelects = WrappedComponent =>
  class withOptionsForSelects extends Component {
    state = {
      platforms: [],
      seniority: [],
      companies: [],
      location: []
    };

    componentDidMount() {
      getOptionsForSelects().then(optionsForSelects => {
        const options = {
          platforms: optionsForSelects.platforms,
          seniority: optionsForSelects.seniorities,
          companies: optionsForSelects.companies,
          location: optionsForSelects.location
        };

        this.setState({ ...options });
      });
    }

    render() {
      return <WrappedComponent options={this.state} {...this.props} />;
    }
  };

export default withOptionsForSelects;
