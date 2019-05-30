import React, { Component } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";

export default class ModalToDeleteWithComment extends Component {
  state = {
    modal: this.props.isOpenModal,
    comment: ""
  };

  toggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }));

    this.props.onRequestClose();
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleDelete = event => {
    event.preventDefault();

    this.props.onDelete(this.state.comment);

    this.resetCommentState();
  };

  resetCommentState = () => {
    this.setState({
      comment: ""
    });
  };

  render() {
    const { modal, comment } = this.state;
    const { title, name, className } = this.props;

    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className={`modal-danger " + ${className ? className : ""}`}
      >
        <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
        <ModalBody>
          {`Are you sure to delete ${name}?`}
          <Input
            type="textarea"
            name="comment"
            value={comment}
            placeholder="Type a comment"
            onChange={this.handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.handleDelete}>
            Delete
          </Button>
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
