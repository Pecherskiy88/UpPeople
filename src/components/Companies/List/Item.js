import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
  Row
} from "reactstrap";
import "../Companies.css";

const CompaniesListItem = ({ id, logo, name, vacancies, candidates }) => (
  <Card style={{ marginBottom: "1rem" }}>
    <Link to={`/companies/${id}`} logo={logo}>
      <CardBody style={{ padding: "0.5rem" }}>
        <CardImg top width="100%" src={logo} alt="logo" />
        <CardTitle
          style={{
            marginBottom: 0,
            fontSize: 12,
            textAlign: "center",
            textDecoration: "none"
          }}
        >
          {name}
        </CardTitle>
      </CardBody>
    </Link>
    <CardFooter style={{ padding: "0.5rem" }}>
      <Row style={{ margin: 0 }}>
        <Col sm="6" xs="6" style={{ padding: "0 0.25rem" }}>
          <div className="description-block">
            <h5 className="description-header ng-binding">{vacancies}</h5>
            <span className="description-text">Vacancies</span>
          </div>
        </Col>
        <Col sm="6" xs="6" style={{ padding: "0 0.25rem" }}>
          <div className="description-block">
            <h5 className="description-header ng-binding">{candidates}</h5>
            <span className="description-text">Candidates</span>
          </div>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

CompaniesListItem.propTypes = {
  id: PropTypes.number.isRequired,
  logo: PropTypes.string,
  vacancies: PropTypes.number,
  candidates: PropTypes.number
};

CompaniesListItem.defaultProps = {
  logo: "",
  vacancies: 0,
  candidates: 0
};

export default CompaniesListItem;
