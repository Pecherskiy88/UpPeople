// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, FormGroup, Input, Form } from "reactstrap";

const initialState = {
  name: ""
};

export default class PlatformsCreateForm extends Component {
  static propTypes = {
    onCreatePlatform: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  state = {
    ...initialState
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onCreatePlatform, onRequestClose } = this.props;

    onCreatePlatform(this.state);

    this.setState({ ...initialState });
    onRequestClose();
  };

  render() {
    const { name } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Col>
            <Input
              type="text"
              name="name"
              value={name}
              placeholder="Platform name"
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <Button color="primary" onClick={this.handleSubmit}>
          Create
        </Button>
      </Form>
    );
  }
}
