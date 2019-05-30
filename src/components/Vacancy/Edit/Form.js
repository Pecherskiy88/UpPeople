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
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
// Components
import Select from "../../shared/Select";
// Instruments
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Form.css";

export default class VacancyEditForm extends Component {
  static propTypes = {
    vacancy: PropTypes.shape({
      id: PropTypes.number,
      platform: PropTypes.shape({
        id: PropTypes.number,
        nazva: PropTypes.string
      }),
      seniority: PropTypes.shape({
        id: PropTypes.number,
        nazva: PropTypes.string
      }),
      company: PropTypes.shape({
        id: PropTypes.number,
        nazva: PropTypes.string
      }),
      location: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      status: PropTypes.shape({
        id: PropTypes.number,
        status: PropTypes.string
      }),
      salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      link: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      details: PropTypes.string
    }),
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
    onEditVacancy: PropTypes.func.isRequired
  };

  static defaultProps = {
    vacancy: {
      id: null,
      seniority: {},
      platform: {},
      company: {},
      location: {},
      status: {},
      salary: "",
      link: "",
      date: "",
      description: "",
      details: ""
    }
  };

  state = {
    selectPlatform: [],
    selectSeniority: [],
    selectCompany: [],
    selectLocation: [],
    salary: "",
    comment: "",
    link: "",
    selectedVacancyStatus: "",
    description: EditorState.createEmpty(),
    details: EditorState.createEmpty()
  };

  componentDidUpdate(prevProps) {
    const { vacancy, options } = this.props;
    if (this.props !== prevProps) {
      if (vacancy.platform !== null) {
        const selectedPlatform = options.platforms.find(
          platform => platform.id === vacancy.platform.id
        );

        this.setState({
          selectPlatform: selectedPlatform
        });
      }

      if (vacancy.seniority !== null) {
        const selectedSeniority = options.seniority.find(
          seniority => seniority.id === vacancy.seniority.id
        );

        this.setState({
          selectSeniority: selectedSeniority
        });
      }

      if (vacancy.company !== null) {
        const selectedCompany = options.companies.find(
          company => company.id === vacancy.company.id
        );

        this.setState({
          selectCompany: selectedCompany
        });
      }

      if (vacancy.location !== null) {
        const selectedLocation = options.location.find(
          location => location.id === vacancy.location.id
        );

        this.setState({
          selectLocation: selectedLocation
        });
      }

      const htmlDescription = vacancy.description;
      const descriptionBlock = htmlToDraft(htmlDescription);
      if (descriptionBlock) {
        const contentState = ContentState.createFromBlockArray(
          descriptionBlock.contentBlocks
        );
        const description = EditorState.createWithContent(contentState);

        this.setState({
          description
        });
      }

      const htmlDetails = vacancy.details;
      if (htmlDetails) {
        const detailsBlock = htmlToDraft(htmlDetails);
        if (detailsBlock) {
          const contentState = ContentState.createFromBlockArray(
            detailsBlock.contentBlocks
          );
          const details = EditorState.createWithContent(contentState);

          this.setState({
            details
          });
        }
      }

      const salary = vacancy.salary !== null ? vacancy.salary : "";
      const comment = vacancy.comment !== null ? vacancy.comment : "";
      const link = vacancy.link !== null ? vacancy.link : "";
      const selectedVacancyStatus = vacancy.status.id;

      this.setState({
        salary,
        comment,
        link,
        selectedVacancyStatus
      });
    }
  }

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

    const { salary, description, details } = this.state;
    const { onEditVacancy } = this.props;

    const salaryToNum = Number(salary);

    const descriptionEditorState = draftToHtml(
      convertToRaw(description.getCurrentContent())
    );

    const detailsEditorState = draftToHtml(
      convertToRaw(details.getCurrentContent())
    );

    const vacancy = {
      ...this.state,
      salary: salaryToNum,
      description: descriptionEditorState,
      details: detailsEditorState
    };

    onEditVacancy(vacancy);
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
      options: { platforms, seniority, companies, location },
      vacancy: { id }
    } = this.props;

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
                <h6>Freelancer Description</h6>
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
                          to={`/vacancies/${id}`}
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
