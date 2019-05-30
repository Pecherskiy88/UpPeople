// Core
import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
// Components
import ModalToDelete from "../../shared/ModalToDelete";
// Context
import { ModalConsumer } from "../../../providers/ModalProvider";

const LinksTableRow = ({ idx, id, title, link, onDelete }) => (
  <>
    <td>{idx + 1}</td>
    <td>{title}</td>
    <td>
      <a href={`${link}`} rel="noopener noreferrer" target="_blank">
        {link}
      </a>
    </td>
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
                title: "Delete link",
                name: `${title}`,
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

LinksTableRow.propTypes = {
  idx: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  onDelete: PropTypes.func
};

LinksTableRow.defaultProps = {
  title: "",
  link: "",
  onDelete: () => null
};

export default LinksTableRow;
