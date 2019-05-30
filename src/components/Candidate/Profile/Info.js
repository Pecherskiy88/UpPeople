// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  ListGroup,
  ListGroupItem
} from "reactstrap";
// Instruments
import noAvatar from "../../../assets/img/no_avatar.png";

const CandidateProfileInfo = ({
  candidate: {
    avatar,
    name,
    platform,
    date,
    salary,
    language,
    phone,
    email,
    skype,
    linkedIn,
    resume
  }
}) => (
  <Card>
    <CardBody>
      <div style={{ textAlign: "center" }}>
        <CardImg
          top
          style={{
            width: 150,
            height: 150
          }}
          src={avatar !== null ? avatar : noAvatar}
          alt="avatar"
        />
      </div>
      <CardTitle style={{ textAlign: "center", fontSize: "1rem" }}>
        {name}
      </CardTitle>
      <ListGroup flush>
        {platform && (
          <ListGroupItem style={{ alignSelf: "center", fontSize: "1rem" }}>
            {platform.nazva}
          </ListGroupItem>
        )}
        {date && (
          <ListGroupItem>
            Date: {moment(date).format("DD MMMM YYYY")}
          </ListGroupItem>
        )}
        {phone && (
          <ListGroupItem>
            Phone: <a href={`tel:${phone}`}>{phone}</a>
          </ListGroupItem>
        )}
        {skype && <ListGroupItem>Skype: {skype}</ListGroupItem>}
        {email && (
          <ListGroupItem>
            Email:{" "}
            <a href={`mailto:${email}`} target="_top">
              {email}
            </a>
          </ListGroupItem>
        )}
        {salary && <ListGroupItem>Salary: {salary}</ListGroupItem>}
        {language && <ListGroupItem>Languages: {language}</ListGroupItem>}
        {linkedIn && (
          <ListGroupItem>
            LinkedIn:{" "}
            <a href={linkedIn} target="_blanck">
              link
            </a>
          </ListGroupItem>
        )}
        {resume && (
          <ListGroupItem>
            Resume:{" "}
            <a href={resume} target="_blanck">
              link
            </a>
          </ListGroupItem>
        )}
      </ListGroup>
    </CardBody>
  </Card>
);

CandidateProfileInfo.propTypes = {
  candidate: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    platform: PropTypes.shape({
      id: PropTypes.number,
      nazva: PropTypes.string
    }),
    date: PropTypes.string,
    salary: PropTypes.string,
    language: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    skype: PropTypes.string,
    linkedIn: PropTypes.string,
    resume: PropTypes.string
  })
};

CandidateProfileInfo.defaultProps = {
  candidate: {}
};

export default CandidateProfileInfo;
