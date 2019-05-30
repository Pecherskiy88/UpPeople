import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { AccountContext } from "../../../providers/AccountProvider";
import "./Login.css";

export default class Login extends Component {
  static contextType = AccountContext;

  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { signIn } = this.context;

    if (email === "" || password === "") return;

    const user = {
      email,
      password
    };

    signIn(user);
  };

  checkAuthentication = () => {
    const { history } = this.props;
    const { authorized } = this.context;
    console.log(
      "Login this.props",
      this.props,
      "Login this.context",
      this.context
    );
    if (authorized) {
      history.push("/");
    }
  };

  render() {
    const { email, password } = this.state;
    const { authError } = this.context;

    const showError = authError ? "Введен неправильный Email или пароль" : null;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>
                        <b>UP</b>People
                      </h1>
                      {authError ? (
                        <p style={{ color: "#f00" }}>{showError}</p>
                      ) : (
                        <p className="text-muted">
                          Sign in to start your session
                        </p>
                      )}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          className="name"
                          name="email"
                          value={email}
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={password}
                          autoComplete="current-password"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col>
                          <Button
                            type="submit"
                            color="primary"
                            className="px-4"
                          >
                            Sign In
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
