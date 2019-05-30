// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
// Components
import VacancyProfileInfo from "./Info";
import InnerHTMLMarkUp from "../../InnerHTMLMarkUp";
import ControlledEditor from "../../shared/ControlledEditor";
import OpenClose from "../../../render_prop/OpenClose";
// HOC
import withToggleCardBody from "../../hoc/withToggleCardBody";
// Instruments
import { getVacancyProfile, updateVacancy } from "../../../utils/api/vacancy";

const WithToggleCardBodyEditor = withToggleCardBody(ControlledEditor);

export default class VacancyProfile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      role: PropTypes.number.isRequired
    })
  };

  state = {
    id: null,
    date: "",
    company: {},
    platform: {},
    seniority: {},
    status: {},
    location: {},
    salary: "",
    link: "",
    description: "",
    details: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getVacancyProfile(id).then(vacancy => {
      this.setState({ ...vacancy });
    });
  }

  updateVacancyProfileContent = content => {
    const { id } = this.props.match.params;

    updateVacancy(id, content).then(updatedVacancy => {
      this.setState({
        ...updatedVacancy
      });
    });
  };

  render() {
    const { description, details } = this.state;
    const {
      user: { role }
    } = this.props;

    return (
      <>
        <Row>
          <Col md={6} sm={12}>
            <VacancyProfileInfo vacancy={this.state} userRole={role} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {role !== 4 ? (
              <>
                <OpenClose
                  render={(isOpen, open, close) =>
                    isOpen ? (
                      <WithToggleCardBodyEditor
                        content={description}
                        title="Description"
                        isOpen={isOpen}
                        close={close}
                        onUpdate={this.updateVacancyProfileContent}
                      />
                    ) : (
                      <InnerHTMLMarkUp
                        title="Description"
                        content={description}
                        isOpen={isOpen}
                        open={open}
                        close={close}
                      />
                    )
                  }
                />
                <OpenClose
                  render={(isOpen, open, close) =>
                    isOpen ? (
                      <WithToggleCardBodyEditor
                        content={details}
                        title="Details"
                        isOpen={isOpen}
                        close={close}
                        onUpdate={this.updateVacancyProfileContent}
                      />
                    ) : (
                      <InnerHTMLMarkUp
                        title="Details"
                        content={details}
                        isOpen={isOpen}
                        open={open}
                        close={close}
                      />
                    )
                  }
                />
              </>
            ) : (
              <InnerHTMLMarkUp title="Details" content={details} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}
