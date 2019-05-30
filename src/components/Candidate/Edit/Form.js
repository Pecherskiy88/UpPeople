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
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
// Components
import Select from "../../shared/Select";
// Instruments
import noAvatar from "../../../assets/img/no_avatar.png";
import { getBase64 } from "../../../utils/selectors";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./Form.module.css";

const style = {
  icon: {
    position: "absolute",
    top: "0.6rem",
    right: "1.75rem"
  }
};

export default class CandidateEditForm extends Component {
  static propTypes = {
    candidate: PropTypes.shape({
      id: PropTypes.number,
      avatar: PropTypes.string,
      name: PropTypes.string,
      platform: PropTypes.shape({
        id: PropTypes.number,
        nazva: PropTypes.string
      }),
      date: PropTypes.string,
      salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      language: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      skype: PropTypes.string,
      linkedIn: PropTypes.string,
      resume: PropTypes.string,
      comment: PropTypes.string,
      about: PropTypes.string
    }).isRequired,
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    onUploadAvatar: PropTypes.func.isRequired,
    onEditCandidate: PropTypes.func.isRequired
  };

  state = {
    avatar: null,
    name: "",
    selectPlatform: [],
    date: "",
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

  componentDidUpdate(prevProps) {
    const { candidate, platforms } = this.props;

    if (candidate.id !== prevProps.candidate.id) {
      const selectedPlatform =
        candidate.platform !== null &&
        platforms.find(platform => platform.id === candidate.platform.id);

      this.setState({
        selectPlatform: selectedPlatform
      });

      const htmlAbout = candidate.about;
      if (htmlAbout) {
        const aboutBlock = htmlToDraft(htmlAbout);
        if (aboutBlock) {
          const contentState = ContentState.createFromBlockArray(
            aboutBlock.contentBlocks
          );
          const about = EditorState.createWithContent(contentState);

          this.setState({
            about
          });
        }
      }

      const avatar = candidate.avatar !== null ? candidate.avatar : noAvatar;
      const date =
        candidate.date !== null
          ? moment(candidate.date).format("YYYY-MM-DD")
          : "";
      const salary = candidate.salary !== null ? candidate.salary : "";
      const language = candidate.language !== null ? candidate.language : "";
      const phone = candidate.phone !== null ? candidate.phone : "";
      const email = candidate.email !== null ? candidate.email : "";
      const skype = candidate.skype !== null ? candidate.skype : "";
      const linkedIn = candidate.linkedIn !== null ? candidate.linkedIn : "";
      const resume = candidate.resume !== null ? candidate.resume : "";
      const comment = candidate.comment !== null ? candidate.comment : "";

      this.setState({
        avatar,
        name: candidate.name,
        date,
        salary,
        language,
        phone,
        email,
        skype,
        linkedIn,
        resume,
        comment
      });
    }
  }

  handleAvatarSelected = ({ target }) => {
    const avatar = target.files[0];

    getBase64(avatar, result => {
      this.setState({
        avatar: result
        // updateImage: true
      });
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
      date,
      salary,
      language,
      phone,
      skype,
      email,
      linkedIn,
      resume,
      comment,
      about,
      selectPlatform
    } = this.state;
    const { onEditCandidate } = this.props;

    const aboutEditorState = draftToHtml(
      convertToRaw(about.getCurrentContent())
    );

    const candidateToUpdate = {
      name,
      date,
      salary,
      language,
      phone,
      skype,
      email,
      linkedIn,
      resume,
      comment,
      selectPlatform,
      about: aboutEditorState
    };

    onEditCandidate(candidateToUpdate);
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
                {selectPlatform !== undefined && (
                  <ListGroupItem className={styles.listGroupItem}>
                    Platform: {selectPlatform.label}
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
                          options={platforms}
                          value={selectPlatform}
                          placeholder="Platform"
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
                        Language
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
                        CV
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
