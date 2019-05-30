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
  ListGroupItem,
  Row
} from "reactstrap";

const INITIAL_STATE = {
  allVacancies: [],
  freelancerVacancies: [],
  checkedAllVacancies: new Map(),
  checkedFreelancerVacancies: new Map()
};

// TODO: delete component
export default class AddVacancyFreelancerForm extends Component {
  static propTypes = {
    vacancies: PropTypes.shape({
      allVacancies: PropTypes.arrayOf(PropTypes.shape({})),
      freelancerVacancies: PropTypes.arrayOf(PropTypes.shape({}))
    }),
    onAddVacancy: PropTypes.func,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    vacancies: {},
    onAddVacancy: () => null,
    onRequestClose: () => null
  };

  // static getDerivedStateFromProps(nextProps) {
  //   console.log("nextProps: ", nextProps);
  //   if (nextProps) {
  //     return {
  //       ...nextProps.vacancies
  //     };
  //   }
  //   return null;
  // }

  state = {
    ...INITIAL_STATE
  };

  componentDidMount() {
    const { vacancies } = this.props;
    this.setState(prevState => ({
      // ...prevState,
      ...vacancies
    }));
  }

  handleCheckboxVacancyChange = e => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    console.log(item, isChecked);
    this.setState(
      prevState => ({
        checkedAllVacancies: prevState.checkedAllVacancies.set(item, isChecked)
      }),
      () => console.log(this.state.checkedAllVacancies)
    );
  };

  handleCheckboxFreelancerVacancyChange = e => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    console.log(item, isChecked);
    this.setState(
      prevState => ({
        checkedFreelancerVacancies: prevState.checkedFreelancerVacancies.set(
          item,
          isChecked
        )
      }),
      () => console.log(this.state.checkedFreelancerVacancies)
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { checkedAllVacancies, checkedFreelancerVacancies } = this.state;
    const { onAddVacancy, onRequestClose } = this.props;

    // for (var [key, value] of checkedVacancies.entries()) {
    //   console.log(key + " = " + value);
    //   const checkedVacanciesEntries = [...[key + " = " + value]];
    // }

    const checkedAllVacanciesEntries = Array.from(checkedAllVacancies);
    console.log(checkedAllVacanciesEntries);

    const checkedFreelancerVacanciesEntries = Array.from(
      checkedFreelancerVacancies
    );
    console.log(checkedFreelancerVacanciesEntries);

    const content = {
      checkedAllVacanciesEntries
    };

    onAddVacancy(content);
    this.resetForm();
    onRequestClose();
  };

  resetForm = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { allVacancies, freelancerVacancies } = this.state;
    console.log(this.state);
    console.log("AddVacancyFreelancerForm this.props: ", this.props);

    const allVacanciesJSX =
      allVacancies &&
      allVacancies.map(vacancy => (
        <ListGroupItem
          style={{ width: "100%" }}
          key={`${vacancy.companyId}-${vacancy.id}`}
        >
          <CustomInput
            type="checkbox"
            id={vacancy.id}
            checked={this.state.checkedAllVacancies.get(vacancy.id)}
            label={`${vacancy.company !== null ? vacancy.company : ""}
            ${vacancy.platform !== null ? vacancy.platform : ""} ${
              vacancy.seniority !== null ? vacancy.seniority : ""
            }`}
            onChange={this.handleCheckboxVacancyChange}
          />
        </ListGroupItem>
      ));

    const freelancerVacanciesJSX =
      freelancerVacancies &&
      freelancerVacancies.map(vacancy => (
        <ListGroupItem
          style={{ width: "100%" }}
          key={`${vacancy.companyId}-${vacancy.vacId}`}
        >
          <CustomInput
            type="checkbox"
            id={vacancy.vacId}
            checked={this.state.checkedFreelancerVacancies.get(vacancy.vacId)}
            label={`${vacancy.company !== null ? vacancy.company : ""}
            ${vacancy.platform !== null ? vacancy.platform : ""} ${
              vacancy.seniority !== null ? vacancy.seniority : ""
            }`}
            onChange={this.handleCheckboxFreelancerVacancyChange}
          />
        </ListGroupItem>
      ));

    return (
      <Form style={{ padding: "0 1rem" }}>
        <Row style={{ marginBottom: "1.5rem" }}>
          <Col>
            <FormGroup
              style={{
                maxHeight: 300,
                overflowX: "hidden",
                overflowY: "auto"
              }}
              row
            >
              <Label for="exampleCheckbox" className={styles.label}>
                All Vacancies
              </Label>
              {allVacanciesJSX}
            </FormGroup>
            <Row>
              <Col>
                <Button
                  type="submit"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  <i className="icon-plus icons font-lg" /> Add vacancy
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <FormGroup
              style={{
                maxHeight: 300,
                overflowX: "hidden",
                overflowY: "auto"
              }}
              row
            >
              <Label for="exampleCheckbox">Freelancer's Vacancies</Label>
              {freelancerVacanciesJSX}
            </FormGroup>
            <Row>
              <Col>
                <Button type="submit" color="primary" onClick={() => {}}>
                  <i className="icon-plus icons font-lg" /> Delete vacancy
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Button type="submit" color="primary" className="pull-right">
              <i className="icon-plus icons font-lg" /> Add vacancy
            </Button>
          </Col>
        </Row> */}
      </Form>
    );
  }
}
