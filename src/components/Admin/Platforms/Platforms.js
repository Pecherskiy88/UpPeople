// Core
import React, { Component } from "react";
import { Button, Col, Row } from "reactstrap";
// Components
import PlatformsTable from "./Table";
import PlatformsCreateForm from "./CreateForm";
// HOC
import withModal from "../../hoc/withModal";
// Context
import { ModalConsumer } from "../../../providers/ModalProvider";
// Instruments
import {
  getDataForPlatformPage,
  addPlatform,
  deletePlatform
} from "../../../utils/api";

const WithModalPlatformsCreateForm = withModal(PlatformsCreateForm);

export default class Links extends Component {
  state = {
    platforms: [],
    totalPlatforms: null,
    totalPages: null,
    perPage: null,
    currentPage: 1
  };

  componentDidMount() {
    const { currentPage } = this.state;

    this.getData(currentPage);
  }

  createPlatform = platform => {
    addPlatform(platform).then(platform => {
      platform
        ? this.setState({
            platforms: [platform, ...this.state.platforms]
          })
        : console.log("Error while adding platform");
    });
  };

  removePlatform = id => {
    deletePlatform(id).then(data => {
      data.message === "Delete Successfully"
        ? this.setState(state => ({
            platforms: state.platforms.filter(platform => platform.id !== id)
          }))
        : console.log("Error while deleting platform");
    });
  };

  onChangePage = currentPage => {
    this.getData(currentPage);
  };

  getData = currentPage => {
    getDataForPlatformPage(currentPage).then(data => {
      const platformsData = {
        platforms: data.platforms,
        totalPlatforms: data.Count,
        totalPages: data.Page,
        perPage: data.perPage,
        currentPage: data.currentPage
      };
      this.setState({
        ...this.state,
        ...platformsData
      });
    });
  };

  render() {
    const {
      platforms,
      totalPlatforms,
      perPage,
      totalPages,
      currentPage
    } = this.state;

    return (
      <>
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <h1 style={{ marginBottom: 0, fontSize: 24 }}>Platforms</h1>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <ModalConsumer>
              {({ showModal }) => (
                <Button
                  color="success"
                  onClick={() =>
                    showModal(WithModalPlatformsCreateForm, {
                      isOpenModal: true,
                      title: "Create new platform",
                      onCreatePlatform: this.createPlatform
                    })
                  }
                >
                  <i
                    style={{ marginRight: "0.2rem" }}
                    className="fa fa-plus-circle"
                  />
                  Create
                </Button>
              )}
            </ModalConsumer>
          </Col>
        </Row>
        <Row>
          <Col>
            <PlatformsTable
              platforms={platforms}
              totalItems={totalPlatforms}
              pageSize={perPage}
              totalPages={totalPages}
              currentPage={currentPage}
              onChangePage={this.onChangePage}
              onDelete={this.removePlatform}
            />
          </Col>
        </Row>
      </>
    );
  }
}
