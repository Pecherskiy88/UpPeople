// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
// Components
import Select from "../shared/Select";
// Instruments
import { isEmpty } from "../../utils/selectors";
import { getDataForAppointInterviewForm } from "../../utils/api/candidate";
import noAvatar from "../../assets/img/no_avatar.png";

export default class AppointInterviewForm extends Component {
  static propTypes = {
    candidate: PropTypes.shape({
      id: PropTypes.number,
      avatar: PropTypes.string,
      name: PropTypes.string,
      platform: PropTypes.shape({
        id: PropTypes.number,
        nazva: PropTypes.string
      })
    }),
    appointInterview: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    candidate: {}
  };

  state = {
    dataForAppointInterviewForm: {},
    candidate: {},
    defaultCompany: [],
    optionsForSelectCompany: [],
    optionsForSelectContacts: [],
    optionsForSelectVacancy: [],
    selectedCompany: [],
    selectedVacancy: [],
    selectedContacts: [],
    date: "",
    time: "",
    comment: ""
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps) {
      return {
        candidate: nextProps.candidate
      };
    }

    return null;
  }

  componentDidMount() {
    const {
      candidate: { id }
    } = this.props;

    getDataForAppointInterviewForm(id).then(dataForAppointInterviewForm => {
      this.setState(
        {
          dataForAppointInterviewForm
        },
        () => {
          const { dataForAppointInterviewForm } = this.state;

          if (isEmpty(dataForAppointInterviewForm)) {
            return;
          } else {
            const optionsForSelectCompany = Object.keys(
              dataForAppointInterviewForm
            ).map(key => dataForAppointInterviewForm[key]["company"]);

            const findActiveCompany = Object.values(
              dataForAppointInterviewForm
            ).find(
              obj =>
                obj["company"]["compId"] ===
                optionsForSelectCompany[0]["compId"]
            );

            const optionsForSelectVacancy =
              findActiveCompany["vacancies"] !== null
                ? findActiveCompany["vacancies"]
                : this.state.optionsForSelectVacancy;

            const optionsForSelectContacts =
              findActiveCompany["contacts"] !== null
                ? findActiveCompany["contacts"]
                : this.state.optionsForSelectContacts;

            this.setState({
              optionsForSelectCompany,
              optionsForSelectVacancy,
              optionsForSelectContacts,
              selectedCompany: optionsForSelectCompany[0],
              selectedContacts: optionsForSelectContacts,
              date: moment().format("YYYY-MM-DD"),
              time: moment().format("HH:mm")
            });
          }
        }
      );
    });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleCompanyChange = value => {
    const { dataForAppointInterviewForm } = this.state;
    const findActiveCompany = Object.values(dataForAppointInterviewForm).find(
      obj => obj["company"]["compId"] === value.compId
    );

    const optionsForSelectVacancy =
      findActiveCompany["vacancies"] !== null
        ? findActiveCompany["vacancies"]
        : [];

    const optionsForSelectContacts =
      findActiveCompany["contacts"] !== null
        ? findActiveCompany["contacts"]
        : [];

    this.setState({
      selectedCompany: value,
      selectedVacancy: [],
      selectedContacts: optionsForSelectContacts,
      optionsForSelectVacancy,
      optionsForSelectContacts
    });
  };

  handleVacancyChange = value => {
    this.setState({ selectedVacancy: value });
  };

  handleContactsChange = value => {
    this.setState({ selectedContacts: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { appointInterview, onRequestClose } = this.props;

    const {
      selectedCompany,
      selectedVacancy,
      selectedContacts,
      date,
      time,
      comment
    } = this.state;

    const content = {
      selectedCompany,
      selectedVacancy,
      selectedContacts,
      date,
      time,
      comment
    };

    appointInterview(content);
    onRequestClose();
  };

  render() {
    const {
      candidate: { avatar, name, platform },
      optionsForSelectCompany,
      optionsForSelectVacancy,
      optionsForSelectContacts,
      defaultCompany,
      selectedCompany,
      selectedVacancy,
      selectedContacts,
      date,
      time,
      comment
    } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody>
                <CardImg
                  top
                  src={avatar !== null ? avatar : noAvatar}
                  alt="avatar"
                />
                <CardTitle style={{ textAlign: "center", fontSize: "1rem" }}>
                  {name}
                </CardTitle>
                <CardSubtitle style={{ textAlign: "center", fontSize: "1rem" }}>
                  {platform && platform.nazva}
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="time">Company</Label>
              <Select
                defaultValue={defaultCompany}
                value={selectedCompany}
                options={optionsForSelectCompany}
                placeholder="Choose company"
                onChange={this.handleCompanyChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="vacancy">Vacancy</Label>
              <Select
                value={selectedVacancy}
                options={optionsForSelectVacancy}
                placeholder="Choose vacancy"
                onChange={this.handleVacancyChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="vacancy">Contacts</Label>
              <Select
                isMulti
                value={selectedContacts}
                options={optionsForSelectContacts}
                placeholder="Choose contacts"
                onChange={this.handleContactsChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input
                type="time"
                id="time"
                name="time"
                value={time}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="comment">Comment</Label>
              <Input
                type="textarea"
                id="comment"
                name="comment"
                value={comment}
                placeholder="Type a comment"
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit" color="primary" className="pull-right">
              Appoint
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
