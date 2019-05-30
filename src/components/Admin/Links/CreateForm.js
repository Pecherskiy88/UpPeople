// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, FormGroup, Input, Form } from "reactstrap";

const initialState = {
  title: "",
  link: ""
};

export default class LinksCreateForm extends Component {
  static propTypes = {
    onCreateLink: PropTypes.func.isRequired,
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

    const { onCreateLink, onRequestClose } = this.props;
    const link = this.state;

    onCreateLink(link);

    this.setState({ ...initialState });
    onRequestClose();
  };

  render() {
    const { title, link } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Col>
            <Input
              type="text"
              name="title"
              value={title}
              placeholder="Title"
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Input
              type="text"
              name="link"
              value={link}
              placeholder="Link"
              onChange={this.handleInputChange}
            />
            <i
              style={{
                position: "absolute",
                top: "0.6rem",
                right: "1.75rem"
              }}
              className="icon-link icons font-lg"
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
