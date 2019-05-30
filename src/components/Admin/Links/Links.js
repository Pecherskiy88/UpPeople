// Core
import React, { Component } from "react";
import { Button, Col, Row } from "reactstrap";
// Components
import LinksTable from "./Table";
import LinksCreateForm from "./CreateForm";
// HOC
import withModal from "../../hoc/withModal";
// Context
import { ModalConsumer } from "../../../providers/ModalProvider";
// Instruments
import { getDataForLinksPage, addLink, deleteLink } from "../../../utils/api";

const WithModalLinksCreateForm = withModal(LinksCreateForm);

export default class Links extends Component {
  state = {
    links: []
  };

  componentDidMount() {
    getDataForLinksPage().then(links => {
      this.setState({
        links
      });
    });
  }

  createLink = link => {
    addLink(link).then(link => {
      link
        ? this.setState({
            links: [link, ...this.state.links]
          })
        : console.log("Error while adding link");
    });
  };

  removeLink = id => {
    deleteLink(id).then(data => {
      data.message === "Delete Successfully"
        ? this.setState(state => ({
            links: state.links.filter(link => link.id !== id)
          }))
        : console.log("Error while deleting link");
    });
  };

  render() {
    const { links } = this.state;

    return (
      <>
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <h1 style={{ marginBottom: 0, fontSize: 24 }}>Links</h1>
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col>
            <ModalConsumer>
              {({ showModal }) => (
                <Button
                  color="success"
                  onClick={() =>
                    showModal(WithModalLinksCreateForm, {
                      isOpenModal: true,
                      title: "Create new link",
                      onCreateLink: this.createLink
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
            <LinksTable links={links} onDelete={this.removeLink} />
          </Col>
        </Row>
      </>
    );
  }
}
