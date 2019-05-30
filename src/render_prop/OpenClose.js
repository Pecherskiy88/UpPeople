import { Component } from "react";

export default class OpenClose extends Component {
  state = {
    isOpen: false
  };

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  render() {
    return this.props.render(this.state.isOpen, this.open, this.close);
  }
}
