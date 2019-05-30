// Core
import React, { Component } from "react";
import { Col, Row } from "reactstrap";
// Components
import ActivityTable from "./Table";
// Instruments
import { getDataForActivityPage } from "../../../utils/api";

export default class Activity extends Component {
  state = {
    logs: [],
    totalLogs: null,
    totalPages: null,
    perPage: null,
    currentPage: 1
  };

  componentDidMount() {
    const { currentPage } = this.state;

    this.getData(currentPage);
  }

  onChangePage = currentPage => {
    this.getData(currentPage);
  };

  getData = currentPage => {
    getDataForActivityPage(currentPage).then(data => {
      const logsData = {
        logs: data.logs,
        totalLogs: data.Count,
        totalPages: data.Page,
        perPage: data.perPage,
        currentPage: data.currentPage
      };
      this.setState(
        {
          ...this.state,
          ...logsData
        },
        () => console.log(this.state)
      );
    });
  };

  render() {
    const { logs, totalLogs, perPage, totalPages, currentPage } = this.state;

    return (
      <>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 150,
              marginBottom: "0.5rem"
            }}
          >
            <h1 style={{ marginBottom: 0, fontSize: 24 }}>Activity</h1>
            <span
              style={{
                alignSelf: "flex-end",
                color: "var(--gray)"
              }}
            >
              {totalLogs}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <ActivityTable
              logs={logs}
              totalItems={totalLogs}
              pageSize={perPage}
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={this.onChangePage}
            />
          </Col>
        </Row>
      </>
    );
  }
}
