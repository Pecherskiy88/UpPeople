// Core
import React, { Component } from "react";
// Components
import SendCandidateForm from "../SendCandidateForm";
// Instruments
import {
  getCandidates,
  sendCandidateForVacancy
} from "../../../utils/api/freelancer";

export default class FreelancerSendFormContainer extends Component {
  state = {
    candidates: []
  };

  componentDidMount() {
    const { platformId } = this.props;
    getCandidates(platformId).then(candidates => {
      this.setState({
        candidates
      });
    });
  }

  sendCandidate = content => {
    sendCandidateForVacancy(content);
  };

  render() {
    const { candidates } = this.state;
    return (
      <SendCandidateForm
        candidates={candidates}
        sendCandidate={this.sendCandidate}
        {...this.props}
      />
    );
  }
}
