import React, { Component, createContext } from "react";
import { Nav, NavItem, NavLink, Badge, Button, ButtonGroup } from "reactstrap";
import MailboxProvider from "../../../providers/MailboxProvider";
import { getAllEmails } from "../../../utils/api";

// export const MailboxContext = createContext({
//   inbox: []
// });

// export const MailboxConsumer = MailboxContext.Consumer;

class Inbox extends Component {
  // static Consumer = MailboxContext.Consumer;

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      inbox: [],
      sent: [],
      dropdownOpen: false
    };
  }

  componentDidMount() {
    this.recieveEmails();
  }

  recieveEmails = () => {
    getAllEmails().then(data => {
      const inbox = data.inBox;

      this.setState({
        inbox
      });
    });
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { inbox } = this.state;
    console.log("this.context inbox: ", this.context);
    const messages =
      inbox.length > 0 ? (
        inbox.map((message, idx) => (
          <li key={idx} className="message unread">
            <a href={`#/email/message/${message.id}`}>
              <div className="actions">
                <span className="action">
                  <i className="fa fa-square-o" />
                </span>
                <span className="action">
                  <i className="fa fa-star-o" />
                </span>
              </div>
              <div className="header">
                <span className="from">{message.from}</span>
                <span className="date">
                  <span className="fa fa-paper-clip" /> {message.date.date}
                </span>
              </div>
              <div className="title">{message.subject}</div>
              <div className="description">{message.email.slice(0, 111)}</div>
            </a>
          </li>
        ))
      ) : (
        <li style={{ color: "var(--blue)" }}>There are no emails yet!</li>
      );

    return (
      <div className="animated fadeIn">
        <div className="email-app mb-4">
          <nav>
            <a href="#/email/compose" className="btn btn-danger btn-block">
              New Email
            </a>
            <Nav>
              <NavItem onClick={this.recieveEmails}>
                <NavLink href="#/email/inbox">
                  <i className="fa fa-inbox" /> Inbox{" "}
                  {/* <Badge color="danger">4</Badge> */}
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink href="/stared">
                  <i className="fa fa-star" /> Stared
                </NavLink>
              </NavItem> */}
              <NavItem onClick={this.recieveEmails}>
                <NavLink href="#/email/inbox">
                  <i className="fa fa-rocket" /> Sent
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink href="/trash">
                  <i className="fa fa-trash-o" /> Trash
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/important">
                  <i className="fa fa-bookmark" /> Important
                  <Badge color="info">5</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/spam">
                  <i className="fa fa-exclamation-circle" /> Spam{" "}
                  <Badge color="danger">4</Badge>
                </NavLink>
              </NavItem> */}
            </Nav>
          </nav>
          <main className="inbox">
            <div className="toolbar">
              {/* <ButtonGroup className={"mr-1"}>
                <Button color="light">
                  <span className="fa fa-envelope" />
                </Button>
                <Button color="light">
                  <span className="fa fa-star" />
                </Button>
                <Button color="light">
                  <span className="fa fa-star-o" />
                </Button>
                <Button color="light">
                  <span className="fa fa-bookmark-o" />
                </Button>
              </ButtonGroup> */}
              <ButtonGroup className={"mr-1"}>
                <Button color="light">
                  <span className="fa fa-mail-reply" />
                </Button>
                <Button color="light">
                  <span className="fa fa-mail-reply-all" />
                </Button>
                <Button color="light">
                  <span className="fa fa-mail-forward" />
                </Button>
              </ButtonGroup>
              {/* <Button color="light" className={"mr-1"}>
                <span className="fa fa-trash-o" />
              </Button>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret color="light">
                  <span className="fa fa-tags" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    add label<Badge color="danger">Home</Badge>
                  </DropdownItem>
                  <DropdownItem>
                    add label<Badge color="info">Job</Badge>
                  </DropdownItem>
                  <DropdownItem>
                    add label<Badge color="success">Clients</Badge>
                  </DropdownItem>
                  <DropdownItem>
                    add label<Badge color="warning">News</Badge>
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <ButtonGroup className="float-right">
                <Button color="light">
                  <span className="fa fa-chevron-left" />
                </Button>
                <Button color="light">
                  <span className="fa fa-chevron-right" />
                </Button>
              </ButtonGroup> */}
            </div>
            <MailboxProvider inbox={inbox}>
              <ul className="messages">{messages}</ul>
            </MailboxProvider>
          </main>
        </div>
      </div>
    );
  }
}

export default Inbox;
