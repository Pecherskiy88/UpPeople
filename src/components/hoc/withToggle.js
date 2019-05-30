// Core
import React, { Component } from "react";
import { Button, Col, Row } from "reactstrap";

const withToggle = WrappedComponent =>
  class withToggle extends Component {
    state = {
      show: false
    };

    toggle = () => {
      this.setState(prevState => ({
        show: !prevState.show
      }));
    };

    render() {
      const { show } = this.state;
      const { text, color } = this.props;
      const colorBtn = show ? "danger" : color;
      return (
        <>
          <Row
            style={{
              marginBottom: "1rem"
            }}
          >
            <Col>
              <Button color={colorBtn} onClick={this.toggle}>
                {text.toUpperCase()}
              </Button>
            </Col>
          </Row>
          {show && <WrappedComponent {...this.props} />}
        </>
      );
    }
  };

export default withToggle;
