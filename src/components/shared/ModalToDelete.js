import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export default class ModalToDelete extends Component {
  state = {
    modal: this.props.isOpenModal
  };

  toggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }));

    const { onRequestClose } = this.props;
    onRequestClose();
  };

  render() {
    const { modal } = this.state;
    const { title, name, className, onDelete } = this.props;

    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className={`modal-danger " + ${className ? className : ""}`}
      >
        <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
        <ModalBody>{`Are you sure to delete ${name}?`}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
