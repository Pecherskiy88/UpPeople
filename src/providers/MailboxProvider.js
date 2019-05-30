import React, { Component, createContext } from "react";
import { getAllEmails } from "../utils/api";

export const MailboxContext = createContext({
  inbox: []
});

export default class MailboxProvider extends Component {
  static Consumer = MailboxContext.Consumer;

  state = {
    inbox: []
  };

  componentDidMount() {
    getAllEmails().then(data => {
      console.log(data);
      const inbox = data.inBox;
      this.setState({
        inbox
      });
    });
    this.setState({
      inbox: this.props.inbox
    });
  }

  render() {
    console.log(this.state.inbox);
    console.log(this.props);
    return (
      <MailboxContext.Provider value={this.props.inbox}>
        {this.props.children}
      </MailboxContext.Provider>
    );
  }
}
