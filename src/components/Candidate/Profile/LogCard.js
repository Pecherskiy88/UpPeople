// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Card, CardBody, CardText } from "reactstrap";

const LogCard = ({ date, text, vacId, vac, compId, compName }) => {
  return (
    <Card>
      <CardBody>
        {/* <CardTitle>Card Title</CardTitle> */}
        <CardText>{text}</CardText>
        <CardText>
          <small className="text-muted">
            {moment(date).format("Do MMMM YYYY, h:mm:ss a")}
          </small>
        </CardText>
      </CardBody>
    </Card>
  );
};

LogCard.propTypes = {
  date: PropTypes.string,
  text: PropTypes.string
};

LogCard.defaultProps = {
  date: "",
  text: ""
};

export default LogCard;
