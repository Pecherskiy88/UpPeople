// Core
import React, { Component } from "react";
import { Col, Row, TabPane } from "reactstrap";
// Components
import Tabs from "../shared/Tabs/Tabs";
import ControlledEditor from "../shared/ControlledEditor";
// Instruments
import { getNotificationTemplates } from "../../utils/api";

const tabs = [
  { id: "1", name: "Resume" },
  { id: "2", name: "Interview" },
  { id: "3", name: "Individual" }
];

export default class NotificationTemplates extends Component {
  state = {
    templates: []
  };

  componentDidMount() {
    getNotificationTemplates().then(templates => {
      this.setState({
        templates
      });
    });
  }

  render() {
    const { templates } = this.state;

    const tabPanes =
      templates.length > 0 &&
      tabs.map(tab => (
        <TabPane tabId={tab.id} key={tab.id}>
          <ControlledEditor content={templates[Number(tab.id - 1)]["text"]} />
        </TabPane>
      ));

    return (
      <>
        <Row>
          <Col>
            <Tabs tabs={tabs}>{tabPanes}</Tabs>
          </Col>
        </Row>
      </>
    );
  }
}
