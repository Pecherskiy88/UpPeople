// Core
import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
// Instruments
import styles from "./ModalForLetter.module.css";

const withModalForLetter = WrappedComponent =>
  class withModalForLetter extends Component {
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
      const { title } = this.props;

      return (
        <div>
          <Modal
            isOpen={modal}
            toggle={this.toggleModal}
            className={`modal-success " + ${styles.modal}`}
          >
            <ModalHeader toggle={this.toggleModal}>{title}</ModalHeader>
            <ModalBody>
              {modal && <WrappedComponent {...this.props} />}
            </ModalBody>
          </Modal>
        </div>
      );
    }
  };

export default withModalForLetter;
