// Core
import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
// Components
import InnerHTMLMarkUp from "../../InnerHTMLMarkUp";
import ControlledEditor from "../../shared/ControlledEditor";
// Render Prop
import OpenClose from "../../../render_prop/OpenClose";
// HOC
import withToggleCardBody from "../../hoc/withToggleCardBody";

const WithToggleCardBodyEditor = withToggleCardBody(ControlledEditor);

const CompanyProfileInfo = ({
  companyInfo: { about, sendDetails, interviewDetails, map },
  onUpdate
}) => (
  <>
    <Row>
      <Col xl={12}>
        <OpenClose
          render={(isOpen, open, close) =>
            isOpen ? (
              <WithToggleCardBodyEditor
                content={sendDetails}
                title="Send details"
                isOpen={isOpen}
                close={close}
                onUpdate={onUpdate}
              />
            ) : (
              <InnerHTMLMarkUp
                content={sendDetails}
                title="Send details"
                isOpen={isOpen}
                open={open}
                close={close}
              />
            )
          }
        />
      </Col>
    </Row>
    <Row>
      <Col xl={12}>
        <OpenClose
          render={(isOpen, open, close) =>
            isOpen ? (
              <WithToggleCardBodyEditor
                content={about}
                title="About company"
                isOpen={isOpen}
                close={close}
                onUpdate={onUpdate}
              />
            ) : (
              <InnerHTMLMarkUp
                content={about}
                title="About company"
                isOpen={isOpen}
                open={open}
                close={close}
              />
            )
          }
        />
      </Col>
    </Row>
    <Row>
      <Col xl={12}>
        <OpenClose
          render={(isOpen, open, close) =>
            isOpen ? (
              <WithToggleCardBodyEditor
                content={interviewDetails}
                title="Interview details"
                isOpen={isOpen}
                close={close}
                onUpdate={onUpdate}
              />
            ) : (
              <InnerHTMLMarkUp
                content={interviewDetails}
                title="Interview details"
                isOpen={isOpen}
                open={open}
                close={close}
              />
            )
          }
        />
      </Col>
    </Row>
    <Row>
      <Col xl={12} style={{ textAlign: "center" }}>
        <InnerHTMLMarkUp content={map} title="Map" />
      </Col>
    </Row>
  </>
);

CompanyProfileInfo.propTypes = {
  companyInfo: PropTypes.shape({
    about: PropTypes.string,
    sendDetails: PropTypes.string,
    interviewDetails: PropTypes.string,
    map: PropTypes.string
  }),
  onUpdate: PropTypes.func
};

CompanyProfileInfo.defaultProps = {
  companyInfo: {},
  onUpdate: () => {}
};

export default CompanyProfileInfo;
