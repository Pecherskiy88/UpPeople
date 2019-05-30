// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Label,
  ListGroupItem,
  Row
} from "reactstrap";

const INITIAL_STATE = {
  candidates: [],
  checkedCandidates: new Map()
};

export default class FreelancerSendCandidateForm extends Component {
  static propTypes = {
    candidates: PropTypes.array,
    sendCandidate: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    candidates: [],
    onRequestClose: () => null
  };

  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps);
    if (nextProps) {
      return {
        candidates: nextProps.candidates
      };
    }

    return null;
  }

  state = {
    ...INITIAL_STATE
  };

  handleCheckboxCandidateChange = ({ target: { id, checked } }) => {
    const item = id;
    const isChecked = checked;

    this.setState(prevState => ({
      checkedCandidates: prevState.checkedCandidates.set(item, isChecked)
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { checkedCandidates } = this.state;
    const { companyId, vacancyId, sendCandidate, onRequestClose } = this.props;

    const checkedCandidatesEntries = Array.from(checkedCandidates);

    const content = {
      companyId,
      vacancyId,
      checkedCandidatesEntries
    };

    sendCandidate(content);
    this.resetForm();
    onRequestClose();
  };

  resetForm = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { candidates, checkedCandidates } = this.state;

    const candidatesJSX =
      candidates.length > 0 &&
      candidates.map(candidate => (
        <ListGroupItem
          style={{ width: "100%" }}
          key={`${candidate.id}-${candidate.platId}`}
        >
          <CustomInput
            type="checkbox"
            id={candidate.id}
            checked={checkedCandidates.get(candidate.id)}
            label={`${candidate.platform !== null ? candidate.platform : ""} ${
              candidate.name !== null ? candidate.name : ""
            } ${candidate.email !== null ? candidate.email : ""} ${
              candidate.salary !== null ? candidate.salary : ""
            }`}
            onChange={this.handleCheckboxCandidateChange}
          />
        </ListGroupItem>
      ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row style={{ marginBottom: "1.5rem" }}>
          <Col>
            <FormGroup>
              <Label for="exampleCheckbox">My Candidates</Label>
              {candidatesJSX}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit" color="primary" className="pull-right">
              <i className="icon-paper-plane icons font-lg" /> Send
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
