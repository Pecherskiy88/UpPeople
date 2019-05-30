// Core
import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
// Components
import ModalToDelete from "../../shared/ModalToDelete";
// Context
import { ModalConsumer } from "../../../providers/ModalProvider";

const PlatformsTableRow = ({ idx, id, name, onDelete }) => (
  <>
    <td>{idx + 1}</td>
    <td>{name}</td>
    <td style={{ paddingLeft: "1.5rem" }}>
      <ModalConsumer>
        {({ showModal, hideModal }) => (
          <Button
            title="delete"
            style={{
              margin: 0,
              padding: "0.2rem",
              backgroundColor: "transparent",
              borderColor: "transparent"
            }}
            onClick={() =>
              showModal(ModalToDelete, {
                isOpenModal: true,
                title: "Delete platform",
                name: `${name}`,
                onDelete: () => {
                  onDelete(id);
                  hideModal();
                }
              })
            }
          >
            <i className="cui-trash icons font-lg" />
          </Button>
        )}
      </ModalConsumer>
    </td>
  </>
);

PlatformsTableRow.propTypes = {
  idx: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  onDelete: PropTypes.func
};

PlatformsTableRow.defaultProps = {
  name: "",
  onDelete: () => null
};

export default PlatformsTableRow;
