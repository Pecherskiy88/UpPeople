// Core
import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardHeader, CardBody, CardTitle } from "reactstrap";
// Components
import CompanyProfileContact from "./Contact";
import CompanyProfileContactsCreateForm from "./CreateForm";
import CompanyProfileContactsEditForm from "./EditForm";
import ModalToDelete from "../../../shared/ModalToDelete";
// HOC
import withModal from "../../../hoc/withModal";
// Context
import { ModalConsumer } from "../../../../providers/ModalProvider";
// Instruments
import styles from "../Profile.module.css";

const WithModalCreateContactForm = withModal(CompanyProfileContactsCreateForm);
const WithModalEditContactForm = withModal(CompanyProfileContactsEditForm);

const CompanyProfileContactsList = ({
  contacts,
  onAddContact,
  onEditContact,
  onDeleteContact
}) => {
  const contactsJSX =
    contacts.length > 0 &&
    contacts.map(contact => (
      <Card key={contact.id}>
        <CardHeader
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0.5rem"
          }}
        >
          <ModalConsumer>
            {({ showModal }) => (
              <Button
                title="edit"
                style={{
                  marginRight: "0.2rem",
                  padding: "0.2rem 0.4rem",
                  backgroundColor: "transparent",
                  borderColor: "transparent"
                }}
                onClick={() =>
                  showModal(WithModalEditContactForm, {
                    isOpenModal: true,
                    title: "edit contact",
                    contactId: contact.id,
                    onEditContact: onEditContact
                  })
                }
              >
                <i className="icon-pencil icons font-sm" color="var(--gray)" />
              </Button>
            )}
          </ModalConsumer>
          <ModalConsumer>
            {({ showModal, hideModal }) => (
              <Button
                title="delete"
                style={{
                  padding: "0.2rem 0.4rem",
                  backgroundColor: "transparent",
                  borderColor: "transparent"
                }}
                onClick={() =>
                  showModal(ModalToDelete, {
                    isOpenModal: true,
                    title: "Delete contact",
                    name: contact.name,
                    onDelete: () => {
                      onDeleteContact(contact.id);
                      hideModal();
                    }
                  })
                }
              >
                <i className="icon-trash icons font-sm" color="var(--gray)" />
              </Button>
            )}
          </ModalConsumer>
        </CardHeader>
        <CompanyProfileContact {...contact} />
      </Card>
    ));

  return (
    <Card>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className={styles.cardHeading}>Contacts</CardTitle>
        <ModalConsumer>
          {({ showModal }) => (
            <Button
              color="primary"
              onClick={() =>
                showModal(WithModalCreateContactForm, {
                  isOpenModal: true,
                  title: "new contact",
                  onAddContact: onAddContact
                })
              }
            >
              <b>
                <i className="fa fa-plus" />
              </b>
            </Button>
          )}
        </ModalConsumer>
      </CardHeader>
      <CardBody>{contactsJSX}</CardBody>
    </Card>
  );
};

CompanyProfileContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      skype: PropTypes.string
    })
  ),
  onAddContact: PropTypes.func.isRequired,
  onGetContact: PropTypes.func,
  onDeleteContact: PropTypes.func.isRequired
};

CompanyProfileContactsList.defaultProps = {
  contacts: [],
  onGetContact: () => {}
};

export default CompanyProfileContactsList;
