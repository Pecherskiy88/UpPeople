import React, { Component } from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import "./Modals.css";

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      large: false,
      small: false,
      primary: false,
      success: false,
      warning: false,
      danger: false,
      info: false,
      name: "",
      password: "",
      email: "",
      phone: "",
      role: "1"
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleSmall = this.toggleSmall.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleWarning = this.toggleWarning.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large
    });
  }

  toggleSmall() {
    this.setState({
      small: !this.state.small
    });
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success
    });
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning
    });
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger
    });
  }

  toggleInfo() {
    this.setState({
      info: !this.state.info
    });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, password, email, phone, role } = this.state;
    const { onAddUser } = this.props;

    const user = {
      name,
      password,
      email,
      phone,
      role
    };

    onAddUser(user);

    this.toggle();
  };

  render() {
    const { name, email, password, phone, role } = this.state;

    return (
      <div className="animated fadeIn">
        <Button onClick={this.toggle} className="mr-1" color="primary">
          New
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>New User</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={this.handleInputChange}
                />
              </div>
              <select
                value={role}
                onChange={e => this.setState({ role: e.currentTarget.value })}
              >
                <option value="1">Admin</option>
                <option value="2">Recruiter</option>
                <option value="3">Manager</option>
                <option value="4">Client</option>
                <option value="5">Partner</option>
              </select>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              New
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Modals;
