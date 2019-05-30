// Core
import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
// Instruments
import styles from "./Profile.module.css";

const Cooperation = ({ termsOfCooperation }) => (
  <Card>
    <CardHeader className={styles.cardHeader}>
      <CardTitle className={styles.cardHeading}>Cooperation</CardTitle>
    </CardHeader>
    <CardBody>{termsOfCooperation}</CardBody>
  </Card>
);

Cooperation.propTypes = {
  termsOfCooperation: PropTypes.string
};

Cooperation.defaultProps = {
  termsOfCooperation: ""
};

export default Cooperation;
