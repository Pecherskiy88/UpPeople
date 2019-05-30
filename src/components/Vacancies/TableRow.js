// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
// Components
import FreelancerSendFormContainer from "../Freelancer/containers/SendFormContainer";
import Select from "../shared/Select";
import ModalToDelete from "../shared/ModalToDelete";
// HOC
import withModalForLetter from "../hoc/ModalForLetter/withModalForLetter";
// Context
import { ModalConsumer } from "../../providers/ModalProvider";

const WithModalFreelancerSendCandidateForm = withModalForLetter(
  FreelancerSendFormContainer
);

const VacanciesTableRow = ({
  id,
  companyId,
  company,
  platId,
  platform,
  seniority,
  location,
  salary,
  date,
  status,
  vacancyStatus,
  userRole,
  onDeleteVacancy,
  onChangeVacancyStatus
}) => (
  <>
    <td>
      {userRole !== 4 ? (
        <Link to={`/companies/${companyId}`}>{company}</Link>
      ) : (
        company
      )}
    </td>
    <td>
      <Link to={`/vacancies/${id}`}>{platform !== null && platform}</Link>
    </td>
    <td>{seniority !== null && seniority}</td>
    <td>{location !== null && location}</td>
    <td>{salary}</td>
    <td>{moment(date).format("DD.MM.YY")}</td>
    {userRole !== 4 ? (
      <td>
        <Select
          defaultValue={vacancyStatus.find(
            vacancyStatus => vacancyStatus.label === status
          )}
          options={vacancyStatus}
          onChange={value => {
            const content = {
              id,
              value
            };
            onChangeVacancyStatus(content);
          }}
        />
      </td>
    ) : (
      <td style={{ paddingLeft: "2.5rem" }}>{status}</td>
    )}
    {userRole !== 4 ? (
      <td>
        <Link
          to={`/vacancies/${id}/edit`}
          title="edit"
          style={{
            marginRight: "0.25rem",
            padding: "0.2rem",
            color: "var(--dark)",
            textDecoration: "none"
          }}
        >
          <i className="cui-pencil icons font-lg" />
        </Link>
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
                  title: "Delete vacancy",
                  name: `vacancy ${platform} in ${company}`,
                  onDelete: () => {
                    onDeleteVacancy(id);
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
    ) : (
      <td style={{ paddingLeft: "1.5rem" }}>
        <ModalConsumer>
          {({ showModal }) => (
            <Button
              title="select candidate"
              style={{
                margin: 0,
                padding: "0.2rem",
                color: "var(--dark)",
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
              onClick={() =>
                showModal(WithModalFreelancerSendCandidateForm, {
                  isOpenModal: true,
                  title: "Select candidate",
                  platformId: platId,
                  companyId: companyId,
                  vacancyId: id
                })
              }
            >
              <i className="cui-user-follow icons font-lg" />
            </Button>
          )}
        </ModalConsumer>
      </td>
    )}
  </>
);

VacanciesTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  companyId: PropTypes.number.isRequired,
  company: PropTypes.string,
  platId: PropTypes.number.isRequired,
  platform: PropTypes.string,
  seniority: PropTypes.string,
  location: PropTypes.string,
  salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  date: PropTypes.string,
  status: PropTypes.string,
  vacancyStatus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onDeleteVacancy: PropTypes.func.isRequired,
  onChangeVacancyStatus: PropTypes.func.isRequired
};

VacanciesTableRow.defaultProps = {
  company: "",
  platform: "",
  seniority: "",
  location: "",
  salary: "",
  date: "",
  status: ""
};

export default VacanciesTableRow;
