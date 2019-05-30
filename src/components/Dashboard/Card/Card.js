// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  ButtonGroup,
  ButtonDropdown,
  Card,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

class DashboardCard extends Component {
  static propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number,
    desc: PropTypes.string
  };

  static defaultProps = {
    color: "primary",
    title: "",
    amount: null,
    desc: ""
  };

  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const { card, amount, history } = this.props;

    const links =
      card.links &&
      card.links.map(link => (
        <DropdownItem key={link.id} onClick={() => history.push(link.route)}>
          {link.title}
        </DropdownItem>
      ));

    return (
      <Card
        className={`text-white bg-${card.color}`}
        style={{ minHeight: "113px" }}
      >
        <CardBody>
          <ButtonGroup className="float-right">
            {links && (
              <ButtonDropdown
                id={card.title}
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret className="p-0" color="transparent">
                  <i className="icon-link" />
                </DropdownToggle>
                <DropdownMenu right>{links}</DropdownMenu>
              </ButtonDropdown>
            )}
          </ButtonGroup>
          {card.title && (
            <div className="text-value">
              {card.title}: {amount}
            </div>
          )}
          <div>{card.desc}</div>
          {card.time && <div>on {card.time}</div>}
          {/* <div className="chart-wrapper mt-3" style={{ height: "70px" }}>
          <Line
            data={cardChartData2}
            options={cardChartOpts2}
            height={70}
          />
        </div> */}
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(DashboardCard);
