// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardImg,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
// Components
import Select from "../../shared/Select";
// Instruments
import noAvatar from "../../../assets/img/no_avatar.png";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./Form.module.css";

const style = {
  icon: {
    position: "absolute",
    top: "0.6rem",
    right: "1.75rem"
  }
};

export default class CandidateCreateForm extends Component {
  static propTypes = {
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    onUploadAvatar: PropTypes.func.isRequired,
    onCreateCandidate: PropTypes.func.isRequired
  };

  state = {
    avatar: noAvatar,
    name: "",
    selectPlatform: [],
    date: moment().format("YYYY-MM-DD"),
    salary: "",
    language: "",
    phone: "",
    email: "",
    skype: "",
    linkedIn: "",
    resume: "",
    comment: "",
    about: EditorState.createEmpty()
  };

  handleAvatarSelected = event => {
    this.setState({
      avatar: event.target.files[0]
    });
  };

  handleAvatarUpload = () => {
    this.props.onUploadAvatar(this.state.avatar);
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handlePlatformChange = value => {
    this.setState({
      selectPlatform: value
    });
  };

  handleAboutStateChange = about => {
    this.setState({ about });
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      name,
      selectPlatform,
      date,
      salary,
      language,
      phone,
      skype,
      email,
      linkedIn,
      resume,
      comment,
      about
    } = this.state;
    const { onCreateCandidate } = this.props;

    const aboutEditorState = draftToHtml(
      convertToRaw(about.getCurrentContent())
    );

    const newCandidate = {
      name,
      selectPlatform,
      date,
      salary,
      language,
      phone,
      skype,
      email,
      linkedIn,
      resume,
      comment,
      about: aboutEditorState
    };

    onCreateCandidate(newCandidate);
  };

  render() {
    const {
      avatar,
      name,
      selectPlatform,
      date,
      salary,
      language,
      phone,
      skype,
      email,
      linkedIn,
      resume,
      comment,
      about
    } = this.state;
    const { platforms } = this.props;

    return (
      <Row>
        <Col md={3}>
          <Card className={styles.card}>
            <CardImg
              top
              src={avatar}
              className={styles.cardLogo}
              alt="avatar"
            />
            <CardTitle className={styles.cardTitle}>{name}</CardTitle>
            <Input
              type="file"
              className={styles.cardInputFile}
              onChange={this.handleAvatarSelected}
            />
            <Button color="success" onClick={this.handleAvatarUpload}>
              Upload avatar
            </Button>
            <CardBody className={styles.cardBody}>
              <ListGroup flush>
                {selectPlatform.label && (
                  <ListGroupItem className={styles.listGroupItem}>
                    {selectPlatform.label}
                  </ListGroupItem>
                )}
                {date && (
                  <ListGroupItem>
                    Date: {moment(date).format("Do MMM YYYY")}
                  </ListGroupItem>
                )}
                {phone && <ListGroupItem>Phone: {phone}</ListGroupItem>}
                {skype && <ListGroupItem>Skype: {skype}</ListGroupItem>}
                {email && <ListGroupItem>Email: {email}</ListGroupItem>}
              </ListGroup>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Details</CardTitle>
            </CardHeader>
            <CardBody>
              <ListGroup flush>
                {language && (
                  <ListGroupItem>Languages: {language}</ListGroupItem>
                )}
                {comment && <ListGroupItem>Notes: {comment}</ListGroupItem>}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Settings</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
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
                          style={style.icon}
                          className="icon-user icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="platform" sm={3}>
                        Platform
                      </Label>
                      <Col sm={9}>
                        <Select
                          id="platform"
                          value={selectPlatform}
                          placeholder="Platform"
                          options={platforms}
                          onChange={this.handlePlatformChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="date" sm={3}>
                        Date
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="date"
                          type="date"
                          name="date"
                          value={date}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="salary" sm={3}>
                        Salary
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="salary"
                          type="text"
                          name="salary"
                          value={salary}
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={style.icon}
                          className="cui-dollar icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="language" sm={3}>
                        Languages
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="language"
                          type="text"
                          name="language"
                          value={language}
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={style.icon}
                          className="icon-speech icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col lg={6} md={12}>
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
                          style={style.icon}
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
                          style={style.icon}
                          className="icon-social-skype icons font-lg"
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
                          style={style.icon}
                          className="icon-envelope icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="linkedIn" sm={3}>
                        LinkedIn
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="linkedIn"
                          type="url"
                          name="linkedIn"
                          value={linkedIn}
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={style.icon}
                          className="icon-social-linkedin icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="resume" sm={3}>
                        Resume
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="resume"
                          type="url"
                          name="resume"
                          value={resume}
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={style.icon}
                          className="icon-link icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="comment" sm={3}>
                        Comment
                      </Label>
                      <Col sm={9}>
                        <Input
                          id="comment"
                          type="textarea"
                          name="comment"
                          value={comment}
                          onChange={this.handleInputChange}
                        />
                        <i
                          style={style.icon}
                          className="icon-note icons font-lg"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>About</h6>
                    <Editor
                      editorState={about}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      // wrapperStyle={<wrapperStyleObject>}
                      // editorStyle={<editorStyleObject>}
                      // toolbarStyle={<toolbarStyleObject>}
                      localization={{
                        locale: "ru"
                      }}
                      onEditorStateChange={this.handleAboutStateChange}
                    />
                  </Col>
                </Row>
                <Row style={{ justifyContent: "flex-end" }}>
                  <FormGroup check>
                    <Col>
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                    </Col>
                  </FormGroup>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
