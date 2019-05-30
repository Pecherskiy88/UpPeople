// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Label,
  ListGroupItem
} from "reactstrap";

const INITIAL_STATE = {
  vacancies: [],
  checkedVacancies: new Map()
};

export default class FreelancerVacanciesForm extends Component {
  static propTypes = {
    vacancies: PropTypes.arrayOf(PropTypes.shape({})),
    formTitle: PropTypes.string,
    btnText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    vacancies: [],
    formTitle: "All Vacancies",
    btnText: "Add vacancy"
  };

  state = {
    ...INITIAL_STATE
  };

  componentDidMount() {
    const { vacancies } = this.props;

    this.setState({
      vacancies,
      checkedVacancies: new Map()
    });
  }

  componentDidUpdate(prevProps) {
    const { vacancies } = this.props;

    if (vacancies.length !== prevProps.vacancies.length) {
      this.setState({
        vacancies
      });
    }
  }

  handleCheckboxVacancyChange = ({ target: { id, checked } }) => {
    const item = id;
    const isChecked = checked;

    this.setState(prevState => ({
      checkedVacancies: prevState.checkedVacancies.set(item, isChecked)
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { checkedVacancies } = this.state;
    const { onSubmit, onRequestClose } = this.props;

    const checkedVacanciesEntries = Array.from(checkedVacancies);

    const content = {
      checkedVacanciesEntries
    };

    onSubmit(content);

    this.resetForm();
    onRequestClose();
  };

  resetForm = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { vacancies, checkedVacancies } = this.state;
    const { formTitle, btnText } = this.props;

    const vacanciesJSX =
      vacancies &&
      vacancies.map(vacancy => (
        <ListGroupItem
          style={{ width: "100%" }}
          key={`${vacancy.companyId}-${vacancy.id}`}
        >
          <CustomInput
            type="checkbox"
            id={vacancy.id}
            checked={checkedVacancies.get(vacancy.id)}
            label={`${vacancy.company !== null ? vacancy.company : ""}
            ${vacancy.platform !== null ? vacancy.platform : ""} ${
              vacancy.seniority !== null ? vacancy.seniority : ""
            }`}
            onChange={this.handleCheckboxVacancyChange}
          />
        </ListGroupItem>
      ));

    return (
      <Form style={{ padding: "0 1rem" }} onSubmit={this.handleSubmit}>
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: 300,
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
          <Label for="checkbox">{formTitle}</Label>
          <ul
            style={{
              paddingLeft: 0
            }}
          >
            {vacanciesJSX}
          </ul>
        </FormGroup>
        <FormGroup row>
          <Col sm={{ size: 10, offset: 4 }}>
            <Button
              type="submit"
              color={btnText === "Delete vacancy" ? "danger" : "success"}
            >
              {btnText}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
