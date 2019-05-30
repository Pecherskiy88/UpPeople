// Core
import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
// Instruments
import { sendEmail } from "../../../utils/api";

class Compose extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      email: "",
      subject: "",
      body: "",
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, subject, body } = this.state;

    const content = {
      email,
      subject,
      body
    };

    sendEmail(content);
  };

  render() {
    const { email, subject, body } = this.state;
    console.log(this.props);
    return (
      <div className="animated fadeIn">
        <div className="email-app">
          <nav>
            <Nav>
              <NavItem>
                <NavLink href="#/email/inbox">
                  <i className="fa fa-inbox" /> Inbox
                  {/* <Badge color="danger">4</Badge> */}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-rocket" /> Sent
                </NavLink>
              </NavItem>
            </Nav>
          </nav>
          <main>
            <p className="text-center">New Message</p>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row className="mb-3">
                {/* strange reactstrap sizing for Label: className="col-2 col-sm-1 col-form-label" */}
                <Label for="email" xs={2} sm={1}>
                  To:
                </Label>
                <Col xs={10} sm={11}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Type email"
                    autoComplete="email"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-3">
                <Label for="subject" xs={2} sm={1}>
                  Subject:
                </Label>
                <Col xs={10} sm={11}>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    placeholder="Type subject"
                    autoComplete="email"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
            </Form>
            <Row>
              <Col sm={11} className="ml-auto">
                <FormGroup className="mt-4">
                  <Input
                    type="textarea"
                    id="message"
                    name="body"
                    value={body}
                    rows="12"
                    placeholder="Click here to reply"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    color="success"
                    className={"mr-1"}
                    onClick={this.handleSubmit}
                  >
                    Send
                  </Button>
                  {/* <Button type="submit" color="light" className={"mr-1"}>
                    Draft
                  </Button> */}
                  <Button
                    color="danger"
                    className={"mr-1"}
                    onClick={() => this.props.history.push("/email/inbox")}
                  >
                    Discard
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </main>
        </div>
      </div>
    );
  }
}

export default Compose;
