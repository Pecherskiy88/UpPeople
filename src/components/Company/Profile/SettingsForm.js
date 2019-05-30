// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
// Components
// import Select from "../../shared/Select";

export default class CompanyProfileSettingsForm extends Component {
  static propTypes = {
    companyInfo: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      skype: PropTypes.string,
      termsOfCooperation: PropTypes.string,
      map: PropTypes.string
    })
  };

  static defaultProps = {
    companyInfo: {}
  };

  state = {
    name: "",
    phone: "",
    email: "",
    skype: "",
    cooperation: "",
    map: "",
    manager: ""
  };

  componentDidUpdate(prevProps) {
    const {
      companyInfo: {
        name,
        phone,
        email,
        skype,
        termsOfCooperation,
        map,
        managers
      }
    } = this.props;

    if (prevProps) {
      if (
        name !== prevProps.companyInfo.name ||
        email !== prevProps.companyInfo.email ||
        phone !== prevProps.companyInfo.phone ||
        skype !== prevProps.companyInfo.skype ||
        termsOfCooperation !== prevProps.companyInfo.termsOfCooperation ||
        map !== prevProps.companyInfo.map ||
        managers !== prevProps.companyInfo.managers
      ) {
        this.setState({
          name,
          email,
          phone,
          skype,
          cooperation: termsOfCooperation,
          map,
          manager: managers[0].id
        });
      }
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSelectChange = ({ currentTarget: { value } }) => {
    this.setState({ manager: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, email, phone, skype, cooperation, map } = this.state;
    const { onUpdateCompanyProfile } = this.props;

    const companyInfo = {
      name,
      email,
      phone,
      skype,
      cooperation,
      map
    };

    onUpdateCompanyProfile(companyInfo);
  };

  render() {
    const { name, email, phone, skype, cooperation, map, manager } = this.state;
    const {
      companyInfo: { managers }
    } = this.props;

    const optionsForSelect = managers.map(option => (
      <option key={`${option.id}-${option.name}`} value={option.id}>
        {option.name}
      </option>
    ));

    return (
      <Form style={{ padding: 20 }} onSubmit={this.handleSubmit}>
        <Row>
          <Col lg={6} md={12}>
            <FormGroup row>
              <Label for="name" sm={3}>
                Name
              </Label>
              <Col sm={9}>
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
              <Label for="email" sm={3}>
                Email
              </Label>
              <Col sm={9}>
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
              <Label for="phone" sm={3}>
                Phone
              </Label>
              <Col sm={9}>
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
              <Label for="skype" sm={3}>
                Skype
              </Label>
              <Col sm={9}>
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
          </Col>
          <Col lg={6} md={12}>
            <FormGroup row>
              <Label for="cooperation" sm={3}>
                Cooperation
              </Label>
              <Col sm={9}>
                <Input
                  id="cooperation"
                  type="textarea"
                  name="cooperation"
                  value={cooperation}
                  onChange={this.handleInputChange}
                />
                <i
                  style={{
                    position: "absolute",
                    top: "0.6rem",
                    right: "1.75rem"
                  }}
                  className="cui-briefcase icons font-lg"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="map" sm={3}>
                Map
              </Label>
              <Col sm={9}>
                <Input
                  id="map"
                  type="text"
                  name="map"
                  value={map}
                  onChange={this.handleInputChange}
                />
                <i
                  style={{
                    position: "absolute",
                    top: "0.6rem",
                    right: "1.75rem"
                  }}
                  className="cui-location-pin icons font-lg"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="manager" sm={3}>
                Manager
              </Label>
              <Col sm={9}>
                <Input
                  id="manager"
                  type="select"
                  value={manager}
                  placeholder="Manager"
                  onChange={this.handleSelectChange}
                >
                  {optionsForSelect}
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <Row style={{ justifyContent: "flex-end" }}>
          <FormGroup check>
            <Col>
              <Button type="submit" color="primary">
                Update
              </Button>
            </Col>
          </FormGroup>
        </Row>
      </Form>
    );
  }
}
