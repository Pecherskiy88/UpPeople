// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Nav, NavItem, NavLink, Row, TabContent } from "reactstrap";

export default class Tabs extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    vacanciesCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    candidatesCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    commentsCount: PropTypes.number,
    children: PropTypes.node
  };

  static defaultProps = {
    vacanciesCount: null,
    candidatesCount: null,
    commentsCount: null,
    children: []
  };

  state = {
    tabs: this.props.tabs,
    activeTab: new Array(1).fill("1"),
    active: true
  };

  toggle = (tabPane, tab) => {
    const { activeTab } = this.state;
    const newArray = activeTab.slice();
    newArray[tabPane] = tab;

    this.setState({ activeTab: newArray });
  };

  render() {
    const { activeTab, tabs } = this.state;
    const {
      vacanciesCount,
      candidatesCount,
      commentsCount,
      interviewsCount,
      reviewsCount,
      testsCount,
      offersCount
    } = this.props;
    const renderTabName = tabName => {
      switch (tabName) {
        case "Vacancies":
          return `${tabName} ${vacanciesCount ? vacanciesCount : ""}`;
        case "Candidates":
          return `${tabName} ${candidatesCount ? candidatesCount : ""}`;
        case "Comments":
          return `${tabName} ${commentsCount ? commentsCount : ""}`;
        case "Interviews":
          return `${tabName} ${interviewsCount ? interviewsCount : ""}`;
        case "Reviews":
          return `${tabName} ${reviewsCount ? reviewsCount : ""}`;
        case "Tests":
          return `${tabName} ${testsCount ? testsCount : ""}`;
        case "Offers":
          return `${tabName} ${offersCount ? offersCount : ""}`;
        default:
          return tabName;
      }
    };

    const tabsJSX = tabs.map(tab => (
      <NavItem key={tab.id}>
        <NavLink
          active={activeTab[0] === tab.id}
          name={tab.name}
          onClick={() => this.toggle(0, tab.id)}
        >
          {renderTabName(tab.name)}
        </NavLink>
      </NavItem>
    ));

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>{tabsJSX}</Nav>
            <TabContent activeTab={activeTab[0]}>
              {this.props.children}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}
