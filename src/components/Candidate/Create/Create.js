// Core
import React, { Component } from "react";
// Components
import CandidateCreateForm from "./Form";
// Instruments
import { getOptionsForSelects } from "../../../utils/api";
import {
  uploadCandidateAvatar,
  createNewCandidate
} from "../../../utils/api/candidate";

export default class CandidateCreate extends Component {
  state = {
    platforms: []
  };

  componentDidMount() {
    getOptionsForSelects().then(optionsForSelects => {
      const platforms = optionsForSelects.platforms;

      this.setState({
        platforms
      });
    });
  }

  uploadAvatar = (id, file) => {
    uploadCandidateAvatar(id, file).then(data => console.log(data));
  };

  createCandidate = candidate => {
    createNewCandidate(candidate).then(createdCandidate => {
      const { history } = this.props;

      history.push(`/candidates/${createdCandidate.id}`);
    });
  };

  render() {
    const { platforms } = this.state;

    return (
      <>
        <h3>New Candidate</h3>
        <CandidateCreateForm
          platforms={platforms}
          onUploadAvatar={this.uploadAvatar}
          onCreateCandidate={this.createCandidate}
        />
      </>
    );
  }
}
