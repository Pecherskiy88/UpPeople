// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
import { Button, Col, Input, Form, FormGroup } from "reactstrap";

export default class CandidatesCommentForm extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired
  };

  state = {
    comment: this.props.value
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ comment: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { comment } = this.state;
    const { candId, compId, onSave } = this.props;

    const content = {
      candidate_id: candId,
      company_id: compId,
      comment
    };

    onSave(content);
  };

  render() {
    const { comment } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Col xs={6} sm={6} md={8} lg={8}>
            <Input
              type="textarea"
              name="comment"
              value={comment}
              placeholder="Type a comment"
              onChange={this.handleChange}
            />
          </Col>
          <Col xs={6} sm={6} md={4} lg={4}>
            <Button type="submit" color="primary">
              Save
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
