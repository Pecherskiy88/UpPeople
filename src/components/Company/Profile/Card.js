// Core
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardImg, CardTitle, Input } from "reactstrap";
// Instruments
import noLogo from "../../../assets/img/no_logo.jpeg";
import styles from "./Profile.module.css";

const CompanyProfileCard = ({ name, logo, onSelectLogo, onUploadLogo }) => (
  <Card className={styles.card}>
    <CardImg
      top
      src={logo || noLogo}
      className={styles.cardLogo}
      alt="Company logo"
    />
    <CardBody className={styles.cardBody}>
      <CardTitle className={styles.cardTitle}>{name}</CardTitle>
      <Input
        type="file"
        style={{ marginBottom: "1rem" }}
        onChange={onSelectLogo}
      />
      <Button
        color="success"
        style={{ marginBottom: "1rem" }}
        onClick={onUploadLogo}
      >
        Upload logo
      </Button>
      <Link to="/new-vacancy" style={{ textDecoration: "none" }}>
        <Button color="success" block>
          <b>
            <i className="fa fa-plus" /> Add vacancy
          </b>
        </Button>
      </Link>
    </CardBody>
  </Card>
);

CompanyProfileCard.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.string,
  onSelectLogo: PropTypes.func,
  onUploadLogo: PropTypes.func
};

CompanyProfileCard.defaultProps = {
  name: "",
  logo: "",
  onSelectLogo: () => null,
  onUploadLogo: () => null
};

export default CompanyProfileCard;
