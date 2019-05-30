// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
// Components
import Select from "../../shared/Select";
// Instruments
import "./Form.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class VacancyCreateForm extends Component {
  static propTypes = {
    options: PropTypes.shape({
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      seniority: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      companies: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired
      ).isRequired,
      location: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired,
    onCreateVacancy: PropTypes.func.isRequired
  };

  state = {
    selectPlatform: [],
    selectSeniority: [],
    selectCompany: [],
    selectLocation: [],
    salary: "",
    comment: "",
    link: "",
    selectedVacancyStatus: 0,
    description: EditorState.createEmpty(),
    details: EditorState.createEmpty()
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleDescriptionStateChange = description => {
    this.setState({ description });
  };

  handleDetailsStateChange = details => {
    this.setState({ details });
  };

  handlePlatformChange = value => {
    this.setState({
      selectPlatform: value
    });
  };

  handleSeniorityChange = value => {
    this.setState({
      selectSeniority: value
    });
  };

  handleCompanyChange = value => {
    this.setState({
      selectCompany: value
    });
  };

  handleLocationChange = value => {
    this.setState({
      selectLocation: value
    });
  };

  onRadioBtnClick = selectedVacancyStatus => {
    this.setState({ selectedVacancyStatus });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { description, details } = this.state;
    const { onCreateVacancy } = this.props;

    const descriptionEditorState = draftToHtml(
      convertToRaw(description.getCurrentContent())
    );

    const detailsEditorState = draftToHtml(
      convertToRaw(details.getCurrentContent())
    );

    const vacancy = {
      ...this.state,
      description: descriptionEditorState,
      details: detailsEditorState
    };

    onCreateVacancy(vacancy);
  };

  render() {
    const {
      selectPlatform,
      selectSeniority,
      selectCompany,
      selectLocation,
      salary,
      comment,
      link,
      selectedVacancyStatus,
      description,
      details
    } = this.state;
    const {
      options: { platforms, seniority, companies, location }
    } = this.props;
    console.log(this.props);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col md={9}>
            <Card>
              <CardBody>
                <h6>Description</h6>
                <Editor
                  editorState={description}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  // wrapperStyle={<wrapperStyleObject>}
                  // editorStyle={<editorStyleObject>}
                  // toolbarStyle={<toolbarStyleObject>}
                  localization={{
                    locale: "ru"
                  }}
                  onEditorStateChange={this.handleDescriptionStateChange}
                />
                <h6>Details</h6>
                <Editor
                  editorState={details}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  localization={{
                    locale: "ru"
                  }}
                  onEditorStateChange={this.handleDetailsStateChange}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <FormGroup>
                      <Select
                        value={selectPlatform}
                        options={platforms}
                        placeholder="Platform"
                        onChange={this.handlePlatformChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Select
                        value={selectSeniority}
                        options={seniority}
                        placeholder="Seniority"
                        onChange={this.handleSeniorityChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Select
                        value={selectCompany}
                        options={companies}
                        placeholder="Company"
                        onChange={this.handleCompanyChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Select
                        value={selectLocation}
                        options={location}
                        placeholder="Location"
                        onChange={this.handleLocationChange}
                      />
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Input
                          id="salary"
                          type="text"
                          name="salary"
                          value={salary}
                          placeholder="Salary"
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "0.6rem",
                            right: "1.75rem"
                          }}
                          className="cui-dollar icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Input
                          id="comment"
                          type="textarea"
                          name="comment"
                          value={comment}
                          placeholder="Comment"
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "0.6rem",
                            right: "1.75rem"
                          }}
                          className="icon-note icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Input
                          id="link"
                          type="url"
                          name="link"
                          value={link}
                          placeholder="Link"
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={{
                            position: "absolute",
                            top: "0.6rem",
                            right: "1.75rem"
                          }}
                          className="icon-link icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <ButtonGroup
                      style={{ display: "flex", marginBottom: "1rem" }}
                    >
                      <Button
                        className="btn-default"
                        active={selectedVacancyStatus === 0}
                        onClick={() => this.onRadioBtnClick(0)}
                      >
                        <i className="fa fa-fire" />
                      </Button>
                      <Button
                        className="btn-default"
                        active={selectedVacancyStatus === 1}
                        onClick={() => this.onRadioBtnClick(1)}
                      >
                        <i className="fa fa-check-circle" />
                      </Button>
                      <Button
                        className="btn-default"
                        active={selectedVacancyStatus === 2}
                        onClick={() => this.onRadioBtnClick(2)}
                      >
                        <i className="fa fa-history" />
                      </Button>
                      <Button
                        className="btn-default"
                        active={selectedVacancyStatus === 3}
                        onClick={() => this.onRadioBtnClick(3)}
                      >
                        <i className="fa fa-ban" />
                      </Button>
                    </ButtonGroup>
                    <FormGroup row>
                      <Col>
                        <Button type="submit" color="primary" block>
                          Save
                        </Button>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Link
                          to="/vacancies"
                          style={{ textDecoration: "none" }}
                        >
                          <Button type="button" outline color="secondary" block>
                            Cancel
                          </Button>
                        </Link>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    );
  }
}
