// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
import { Button, Col, Input, Form, FormGroup, Row } from "reactstrap";

export default class CompanyProfileCommentsForm extends Component {
  static propTypes = {
    onAddComment: PropTypes.func.isRequired
  };

  state = {
    comment: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { comment } = this.state;
    const { onAddComment } = this.props;

    onAddComment(comment);

    this.resetState();
  };

  resetState = () => {
    this.setState({
      comment: ""
    });
  };

  render() {
    const { comment } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Col xs={2} sm={1} md={1} lg={1}>
            <img
              src="#"
              style={{
                display: "flex",
                width: 40,
                height: 40,
                background: "var(--secondary)",
                borderRadius: "50%"
              }}
              alt="avatar"
            />
          </Col>
          <Col xs={10} sm={11} md={11} lg={11}>
            <Input
              type="textarea"
              name="comment"
              value={comment}
              placeholder="Type a comment"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <Row style={{ justifyContent: "flex-end" }}>
          <FormGroup check>
            <Col>
              <Button type="submit" color="primary">
                Add comment
              </Button>
            </Col>
          </FormGroup>
        </Row>
      </Form>
    );
  }
}
