// Core
import React, { Component } from "react";
// Components
import CandidateEditForm from "./Form";
// HOC
import withOptionsForSelects from "../../hoc/withOptionsForSelects";
// Instruments
import {
  getCandidateProfile,
  uploadCandidateAvatar,
  updateCandidateProfile
} from "../../../utils/api/candidate";

class CandidateEdit extends Component {
  state = {
    candidate: {
      id: null,
      avatar: null,
      name: "",
      date: "",
      phone: "",
      email: "",
      skype: "",
      platform: {},
      language: "",
      salary: null,
      linkedIn: "",
      resume: "",
      comment: "",
      about: ""
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getCandidateProfile(id).then(data => {
      const candidate = data.candidate;
      this.setState({
        candidate
      });
    });
  }

  uploadAvatar = file => {
    const { id } = this.props.match.params;

    uploadCandidateAvatar(id, file).then(data => console.log(data));
  };

  updateCandidate = candidate => {
    const { id } = this.props.match.params;

    updateCandidateProfile(id, candidate).then(updatedCandidate =>
      this.props.history.push(`/candidates/${updatedCandidate.id}`)
    );
  };

  render() {
    const { candidate } = this.state;
    const {
      options: { platforms }
    } = this.props;

    return (
      <>
        <h3>Edit Candidate</h3>
        <CandidateEditForm
          candidate={candidate}
          platforms={platforms}
          onUploadAvatar={this.uploadAvatar}
          onEditCandidate={this.updateCandidate}
        />
      </>
    );
  }
}

export default withOptionsForSelects(CandidateEdit);
