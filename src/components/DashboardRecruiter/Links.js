// Core
import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, Card, CardBody, CardHeader } from "reactstrap";
// HOC
import withToggle from "../hoc/withToggle";

const Links = ({ links }) => {
  const listOfLinks = links.map(link => (
    <Button tag="a" key={link.id} href={link.link} color="link" target="_blank">
      {link.title}
    </Button>
  ));

  return (
    <Card>
      <CardHeader>Links</CardHeader>
      <CardBody>
        <ButtonGroup
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem" }}
        >
          {listOfLinks}
        </ButtonGroup>
      </CardBody>
    </Card>
  );
};

Links.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      link: PropTypes.string
    })
  )
};

Links.defaultProps = {
  links: []
};

export default withToggle(Links);
