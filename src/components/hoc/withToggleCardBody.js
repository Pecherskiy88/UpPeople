// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  Button,
  ButtonGroup,
  Collapse,
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap";

const withToggleCardBody = WrappedComponent =>
  class withToggleCardBody extends Component {
    static propTypes = {
      title: PropTypes.string
    };

    static defaultTypes = {
      title: "Card"
    };

    state = {
      showContent: true
    };

    toggle = () => {
      this.setState(state => ({
        showContent: !state.showContent
      }));
    };

    render() {
      const { title, isOpen, open, close } = this.props;
      const { showContent } = this.state;

      const upDownArrow = classnames({
        "icon-arrow-down": showContent,
        "icon-arrow-up": !showContent,
        icons: true,
        "font-sm": true
      });

      return (
        <Card>
          <CardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <CardTitle
              style={{ marginBottom: 0, fontSize: "14px", fontWeight: "bold" }}
            >
              {title}
            </CardTitle>
            <ButtonGroup>
              <Button
                style={{
                  marginRight: "0.5rem",
                  padding: "0.2rem 0.4rem",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  boxShadow: "none"
                }}
                onClick={this.toggle}
              >
                <i className={upDownArrow} color="var(--gray)" />
              </Button>
              {title !== "Map" ? (
                isOpen ? (
                  <Button
                    title="close"
                    style={{
                      padding: "0.2rem 0.4rem",
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      boxShadow: "none"
                    }}
                    onClick={close}
                  >
                    <i
                      className="icon-close icons font-sm"
                      color="var(--gray)"
                    />
                  </Button>
                ) : (
                  <Button
                    title="edit"
                    style={{
                      padding: "0.2rem 0.4rem",
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      boxShadow: "none"
                    }}
                    onClick={open}
                  >
                    <i
                      className="icon-pencil icons font-sm"
                      color="var(--gray)"
                    />
                  </Button>
                )
              ) : null}
            </ButtonGroup>
          </CardHeader>
          <Collapse isOpen={showContent}>
            <CardBody>
              {showContent && <WrappedComponent {...this.props} />}
            </CardBody>
          </Collapse>
        </Card>
      );
    }
  };

export default withToggleCardBody;
