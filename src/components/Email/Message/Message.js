/* eslint-disable jsx-a11y/anchor-is-valid */
// Core
import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Badge,
  Button,
  FormGroup,
  Input
} from "reactstrap";
// Context
import {
  MailboxContext
  // MailboxConsumer
} from "../../../providers/MailboxProvider";

class Message extends Component {
  static contextType = MailboxContext;

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    console.log("this.props Message: ", this.props);
    console.log("this.context Message: ", this.context);

    return (
      <div className="animated fadeIn">
        <div className="email-app mb-4">
          <nav>
            <a href="#/email/compose" className="btn btn-danger btn-block">
              New Email
            </a>
            <Nav>
              <NavItem>
                <NavLink href="#/email/inbox">
                  <i className="fa fa-inbox" /> Inbox{" "}
                  {/* <Badge color="danger">4</Badge> */}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-rocket" /> Sent
                </NavLink>
              </NavItem>
            </Nav>
          </nav>
          <main className="message">
            <div className="details">
              <div className="title">
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit.
              </div>
              <div className="header">
                <img
                  className="avatar"
                  src="assets/img/avatars/7.jpg"
                  alt="avatar"
                />
                <div className="from">
                  <span>Lukasz Holeczek</span>
                  lukasz@bootstrapmaster.com
                </div>
                <div className="date">
                  Today, <b>3:47 PM</b>
                </div>
              </div>
              <div className="content">
                {/* <MailboxConsumer>
                  {({ inbox }) => <p>{inbox}</p>}
                </MailboxConsumer> */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <blockquote>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </blockquote>
              </div>
              <div className="attachments">
                <div className="attachment">
                  <Badge color="danger">zip</Badge> <b>bootstrap.zip</b>{" "}
                  <i>(2,5MB)</i>
                  <span className="menu">
                    <a href="#" className="fa fa-search">
                      {null}
                    </a>
                    <a href="#" className="fa fa-share">
                      {null}
                    </a>
                    <a href="#" className="fa fa-cloud-download">
                      {null}
                    </a>
                  </span>
                </div>
                <div className="attachment">
                  <Badge color="info">txt</Badge> <b>readme.txt</b> <i>(7KB)</i>
                  <span className="menu">
                    <a href="#" className="fa fa-search">
                      {null}
                    </a>
                    <a href="#" className="fa fa-share">
                      {null}
                    </a>
                    <a href="#" className="fa fa-cloud-download">
                      {null}
                    </a>
                  </span>
                </div>
                <div className="attachment">
                  <Badge color="success">xls</Badge> <b>spreadsheet.xls</b>{" "}
                  <i>(984KB)</i>
                  <span className="menu">
                    <a href="#" className="fa fa-search">
                      {null}
                    </a>
                    <a href="#" className="fa fa-share">
                      {null}
                    </a>
                    <a href="#" className="fa fa-cloud-download">
                      {null}
                    </a>
                  </span>
                </div>
              </div>
              <form method="post" action="">
                <FormGroup>
                  <Input
                    type="textarea"
                    id="message"
                    name="body"
                    rows="12"
                    placeholder="Click here to reply"
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" color="success">
                    Send message
                  </Button>
                </FormGroup>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Message;
