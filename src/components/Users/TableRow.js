// Core
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
// Components
import VacanciesFormContainer from "../Freelancer/containers/VacanciesFormContainer";
import Select from "../shared/Select";
import ModalToDelete from "../shared/ModalToDelete";
// HOC
import withModalForLetter from "../hoc/ModalForLetter/withModalForLetter";
// Context
import { ModalConsumer } from "../../providers/ModalProvider";

const WithModalVacanciesFormContainer = withModalForLetter(
  VacanciesFormContainer
);

const UsersTableRow = ({
  idx,
  id,
  name,
  email,
  tel,
  role,
  usersGroup,
  recruiterId,
  selectRecruiter,
  onChangeRecruiter,
  onDeleteUser
}) => {
  const index = idx + 1;
  const userLink = `/users/${id}`;
  const roleName = role && role.nazva_en;

  return (
    <tr key={id.toString()}>
      <th scope="row">
        <Link to={userLink}>{index}</Link>
      </th>
      <td>
        <Link to={userLink}>{name}</Link>
      </td>
      <td>{email}</td>
      <td>{tel}</td>
      <td>{roleName}</td>
      {usersGroup === "freelancers" && selectRecruiter !== undefined ? (
        <td>
          <Select
            defaultValue={selectRecruiter.find(
              recruiter => recruiter.id === recruiterId
            )}
            options={selectRecruiter}
            onChange={value => {
              const content = {
                id,
                value
              };
              onChangeRecruiter(content);
            }}
          />
        </td>
      ) : (
        usersGroup === "freelancers" && (
          <td>
            <Select
              options={selectRecruiter}
              onChange={value => {
                const content = {
                  id,
                  value
                };
                onChangeRecruiter(content);
              }}
            />
          </td>
        )
      )}
      <td>
        {role && role.id === 4 && (
          <ModalConsumer>
            {({ showModal }) => (
              <Button
                title="add vacancy"
                style={{
                  marginRight: "0.25rem",
                  padding: "0.2rem",
                  color: "var(--dark)",
                  backgroundColor: "transparent",
                  borderColor: "transparent"
                }}
                onClick={() =>
                  showModal(WithModalVacanciesFormContainer, {
                    isOpenModal: true,
                    title: "Add vacancy",
                    id: id
                  })
                }
              >
                <i className="cui-user-follow icons font-lg" />
              </Button>
            )}
          </ModalConsumer>
        )}
        <ModalConsumer>
          {({ showModal, hideModal }) => (
            <Button
              title="delete"
              style={{
                margin: 0,
                padding: "0.2rem",
                paddingLeft: "0.5rem",
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
              onClick={() =>
                showModal(ModalToDelete, {
                  isOpenModal: true,
                  title: "Delete user",
                  name: name,
                  onDelete: () => {
                    onDeleteUser();
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
    </tr>
  );
};

UsersTableRow.propTypes = {
  idx: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  tel: PropTypes.string,
  role: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nazva_en: PropTypes.string.isRequired
  }).isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onChangeRecruiter: PropTypes.func.isRequired
};

UsersTableRow.defaultProps = {
  email: "",
  tel: ""
};

export default UsersTableRow;
