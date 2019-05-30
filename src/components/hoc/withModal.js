import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const withModal = WrappedComponent =>
  class withModal extends Component {
    state = {
      modal: false
    };

    static getDerivedStateFromProps(nextProps) {
      if (nextProps) {
        return {
          modal: nextProps.isOpenModal
        };
      }

      return null;
    }

    toggleModal = () => {
      this.setState(state => ({
        modal: !state.modal
      }));

      const { onRequestClose } = this.props;
      onRequestClose();
    };

    render() {
      const { modal } = this.state;
      const { title, className } = this.props;

      // const renderModalTitle = () => {
      //   switch (title) {
      //     case "new contact":
      //       return "New Contact";
      //     case "edit contact":
      //       return "Edit Contact";
      //     case "appoint interview":
      //       return "Appoint Interview";
      //     case "add vacancy":
      //       return "Add vacancy";
      //     case "new user":
      //       return "New user";
      //     case "create new link":
      //       return "Create new link";
      //     default:
      //       return "Modal";
      //   }
      // };

      return (
        <Modal
          isOpen={modal}
          toggle={this.toggleModal}
          className={`modal-primary " + ${className ? className : ""}`}
        >
          <ModalHeader toggle={this.toggleModal}>{title}</ModalHeader>
          <ModalBody>{modal && <WrappedComponent {...this.props} />}</ModalBody>
        </Modal>
      );
    }
  };

export default withModal;
