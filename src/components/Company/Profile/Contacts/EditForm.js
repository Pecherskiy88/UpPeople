// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Button,
  Form,
  FormGroup,
  CustomInput,
  Input,
  Label
} from "reactstrap";
// Components
import Select from "../../../shared/Select";
// HOC
import withOptionsForSelects from "../../../hoc/withOptionsForSelects";
// Instruments
import { getContactInfo } from "../../../../utils/api/company";

class CompanyProfileContactsEditForm extends Component {
  state = {
    contact: {
      id: null,
      name: "",
      email: "",
      phone: "",
      skype: "",
      selectedPlatforms: []
    },
    isDisabled: false,
    isChecked: false
  };

  componentDidMount() {
    const { contactId } = this.props;
    getContactInfo(contactId).then(contactState => {
      this.setState({ ...contactState });
    });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState(state => ({
      contact: { ...state.contact, [name]: value }
    }));
  };

  handleSelectChange = value => {
    this.setState(state => ({
      contact: { ...state.contact, selectedPlatforms: value }
    }));
  };

  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState(state => ({
      isChecked: checked,
      isDisabled: !state.isDisabled
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { contact, isChecked } = this.state;

    const { contactId, onEditContact, onRequestClose } = this.props;

    const editedContact = {
      ...contact,
      isChecked
    };

    await onEditContact(contactId, editedContact);
    onRequestClose();
  };

  render() {
    const {
      contact: { name, email, phone, skype, selectedPlatforms },
      isDisabled,
      isChecked
    } = this.state;
    const {
      options: { platforms }
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
            <i
              style={{
                position: "absolute",
                top: "0.6rem",
                right: "1.75rem"
              }}
              className="icon-user icons font-lg"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
            <i
              style={{
                position: "absolute",
                top: "0.6rem",
                right: "1.75rem"
              }}
              className="icon-envelope icons font-lg"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phone" sm={2}>
            Phone
          </Label>
          <Col sm={10}>
            <Input
              id="phone"
              type="tel"
              name="phone"
              value={phone}
              onChange={this.handleInputChange}
            />
            <i
              style={{
                position: "absolute",
                top: "0.6rem",
                right: "1.75rem"
              }}
              className="icon-phone icons font-lg"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="skype" sm={2}>
            Skype
          </Label>
          <Col sm={10}>
            <Input
              id="skype"
              type="text"
              name="skype"
              value={skype}
              onChange={this.handleInputChange}
            />
            <i
              style={{
                position: "absolute",
                top: "0.6rem",
                right: "1.75rem"
              }}
              className="icon-social-skype icons font-lg"
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Select
            isMulti
            isDisabled={isDisabled}
            value={selectedPlatforms}
            options={platforms}
            placeholder="Platforms"
            onChange={this.handleSelectChange}
          />
        </FormGroup>
        <FormGroup check row>
          <Label check for="checkbox" style={{ display: "flex" }}>
            <CustomInput
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={this.handleCheckboxChange}
            />{" "}
            All platforms
          </Label>
        </FormGroup>
        <FormGroup check row>
          <Col>
            <Button type="submit" color="primary" className="pull-right">
              Edit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

CompanyProfileContactsEditForm.propTypes = {
  contactId: PropTypes.number.isRequired,
  options: PropTypes.shape({
    platforms: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
  }).isRequired,
  onEditContact: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default withOptionsForSelects(CompanyProfileContactsEditForm);
