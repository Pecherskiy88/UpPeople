// Core
import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
// Components
import UserInfo from "./Info";
// Instruments
import { getUser, updateUser, uploadUserAvatar } from "../../utils/api/user";
import { getBase64 } from "../../utils/selectors";
import "./Profile.css";

const roles = [
  { value: 1, role: "Admin" },
  { value: 2, role: "Recruiter" },
  { value: 3, role: "Manager" },
  { value: 4, role: "Freelancer" },
  { value: 5, role: "Partners" }
];

export default class UserProfile extends Component {
  state = {
    id: null,
    avatar: null,
    name: "",
    password: "",
    email: "",
    phone: "",
    role: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getUser({ id }).then(user => {
      this.setState({
        id: user.id,
        avatar: user.avatar,
        name: user.name !== null ? user.name : "",
        email: user.email !== null ? user.email : "",
        phone: user.phone !== null ? user.phone : "",
        role: user.role
      });
    });
  }

  handleAvatarSelected = ({ target }) => {
    const avatar = target.files[0];

    getBase64(avatar, result => {
      this.setState({
        avatar: result
      });
    });
  };

  handleAvatarUpload = () => {
    const { id } = this.props.match.params;
    const { avatar } = this.state;

    uploadUserAvatar(id, avatar).then(data => console.log(data));
  };

  handleInputChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });

  handleSelectChange = ({ currentTarget: { value } }) => {
    this.setState({ role: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = this.state;

    updateUser(user);
  };

  render() {
    const { avatar, name, password, email, phone, role } = this.state;

    const optionsForSelect = roles.map(option => (
      <option key={`${option.value}-${option.role}`} value={option.value}>
        {option.role}
      </option>
    ));

    return (
      <div>
        <h1>User Profile</h1>
        <Row>
          <Col lg={3}>
            <UserInfo
              avatar={avatar}
              name={name}
              email={email}
              phone={phone}
              onAvatarSelect={this.handleAvatarSelected}
              onAvatarUpload={this.handleAvatarUpload}
            />
          </Col>
          <Col lg={9}>
            <Card>
              <CardHeader>
                <CardTitle className="card-title">Settings</CardTitle>
              </CardHeader>
              <Form style={{ padding: 20 }} onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label for="name" sm={3}>
                    Name
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="name"
                      name="name"
                      value={name}
                      type="text"
                      placeholder="Name"
                      onChange={this.handleInputChange}
                    />
                    <i className="fa fa-user-o" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={this.handleInputChange}
                    />
                    <i className="fa fa-lock" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={this.handleInputChange}
                    />
                    <i className="fa fa-envelope-o" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="phone" sm={3}>
                    Phone
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={!null && phone}
                      placeholder="Phone"
                      onChange={this.handleInputChange}
                    />
                    <i className="fa fa-phone" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="role_id" sm={3}>
                    Role
                  </Label>
                  <Col sm={9}>
                    <Input
                      id="role_id"
                      type="select"
                      value={role}
                      onChange={this.handleSelectChange}
                    >
                      {optionsForSelect}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col>
                    <Button
                      type="submit"
                      color="primary"
                      className="pull-right"
                    >
                      Update
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
