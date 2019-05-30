// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";

const VacancyProfileInfo = ({
  vacancy: {
    id,
    date,
    company,
    platform,
    seniority,
    status,
    location,
    salary,
    link
  },
  userRole
}) => (
  <Card>
    <CardHeader>
      <Link
        to={`/vacancies/${id}/edit`}
        title="edit"
        className="pull-right"
        style={{ color: "var(--dark)", textDecoration: "none" }}
      >
        <i className="icon-pencil icons font-sm" color="var(--gray)" />
      </Link>
    </CardHeader>
    <CardBody>
      <ListGroup flush>
        {date && (
          <ListGroupItem>
            Date: {moment(date).format("DD MMM YYYY")}
          </ListGroupItem>
        )}
        {company && (
          <ListGroupItem>
            Company:{" "}
            {userRole !== 4 ? (
              <Link to={`/companies/${company.id}`}>{company.nazva}</Link>
            ) : (
              company.nazva
            )}
          </ListGroupItem>
        )}
        {platform && <ListGroupItem>Platform: {platform.nazva}</ListGroupItem>}
        {seniority && (
          <ListGroupItem>Seniority: {seniority.nazva}</ListGroupItem>
        )}
        {status && <ListGroupItem>Status: {status.status}</ListGroupItem>}
        {location && <ListGroupItem>Location: {location.name}</ListGroupItem>}
        {salary && <ListGroupItem>Salary: {salary}</ListGroupItem>}
        {link && (
          <ListGroupItem>
            Additional information: <a href={link}>link</a>
          </ListGroupItem>
        )}
      </ListGroup>
    </CardBody>
  </Card>
);

VacancyProfileInfo.propTypes = {
  vacancy: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    company: PropTypes.shape({
      id: PropTypes.number,
      nazva: PropTypes.string
    }),
    platform: PropTypes.shape({
      id: PropTypes.number,
      nazva: PropTypes.string
    }),
    seniority: PropTypes.shape({
      id: PropTypes.number,
      nazva: PropTypes.string
    }),
    status: PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.string
    }),
    location: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    }),
    salary: PropTypes.string,
    link: PropTypes.string
  }),
  userRole: PropTypes.number.isRequired
};

VacancyProfileInfo.defaulProps = {
  vacancy: {}
};

export default VacancyProfileInfo;
