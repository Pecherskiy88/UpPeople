// Core
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";
// Components
import SendResumeForm from "../../Candidate/SendResumeForm";
import ModalToDeleteWithComment from "../../shared/ModalToDeleteWithComment";
// HOC
import withModalForLetter from "../../hoc/ModalForLetter/withModalForLetter";
// Context
import { ModalConsumer } from "../../../providers/ModalProvider";
// Instruments
import { getDataForSendResumeForm } from "../../../utils/api/freelancer";

const WithModalSendResumeForm = withModalForLetter(SendResumeForm);

const CandidateFromFreelancerTableRow = ({
  id,
  date,
  name,
  email,
  platform,
  salary,
  companies,
  recruiter,
  compId,
  freeLancerId,
  onSendResume,
  onRejectCandidate,
  isOpen,
  open,
  close
}) => {
  const getBadge = status => {
    return status === "OFFER" || status === "Hired"
      ? "success"
      : status === "Hold"
      ? "secondary"
      : status === "Interview"
      ? "warning"
      : status === "Rejected" || status === "Refused"
      ? "danger"
      : status === "Review"
      ? "primary"
      : null;
  };
  const platformToObj = platform && JSON.parse(platform);
  const vacancyId = platformToObj.id;
  const vacancyName = platformToObj.platform;

  const vacId = {
    vacancyId
  };

  const company =
    companies &&
    companies.split(";").map(company => {
      const parsedCompany = JSON.parse(company);
      return (
        <Link
          to={`/companies/${parsedCompany.id}`}
          key={`${id}-${parsedCompany.id}`}
        >
          <Badge color={getBadge(parsedCompany.vacStat)}>
            {parsedCompany.name}
          </Badge>{" "}
        </Link>
      );
    });

  return (
    <>
      <td>
        {isOpen ? (
          <i
            className="icon-close icons font-xl"
            style={{ color: "var(--red)", cursor: "pointer" }}
            onClick={close}
          />
        ) : (
          <i
            className="icon-plus icons font-xl"
            style={{ color: "var(--green)", cursor: "pointer" }}
            onClick={open}
          />
        )}
      </td>
      <td>{moment(date).format("DD.MM.YY")}</td>
      <td>
        <Link to={`/vacancies/${vacancyId}`}>{vacancyName}</Link>
      </td>
      <td>
        <Link to={`/candidates/${id}`}>{name}</Link>
      </td>
      <td>{email}</td>
      <td>{salary}</td>
      <td>{company}</td>
      <td>{recruiter}</td>
      <td>
        <ModalConsumer>
          {({ showModal }) => (
            <Button
              title="send resume"
              style={{
                margin: 0,
                marginRight: "0.2rem",
                padding: "0.2rem",
                backgroundColor: "transparent",
                borderColor: "transparent"
              }}
              onClick={() => {
                getDataForSendResumeForm(id, vacId).then(
                  dataForSendResumeForm => {
                    showModal(WithModalSendResumeForm, {
                      isOpenModal: true,
                      title: "Send resume",
                      freeLancerId: freeLancerId,
                      dataForSendResumeForm: dataForSendResumeForm,
                      sendResume: onSendResume
                    });
                  }
                );
              }}
            >
              <i className="cui-envelope-letter icons font-lg" />
            </Button>
          )}
        </ModalConsumer>
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
                showModal(ModalToDeleteWithComment, {
                  isOpenModal: true,
                  title: "Reject candidate",
                  name: name,
                  onDelete: comment => {
                    const content = {
                      companyId: compId,
                      vacancyId,
                      freelancerId: freeLancerId,
                      comment
                    };
                    onRejectCandidate(id, content);
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
};

CandidateFromFreelancerTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  platform: PropTypes.string,
  salary: PropTypes.string,
  companies: PropTypes.string,
  recruiter: PropTypes.string,
  compId: PropTypes.number.isRequired,
  freeLancerId: PropTypes.number.isRequired,
  onSendResume: PropTypes.func.isRequired,
  onRejectCandidate: PropTypes.func.isRequired
};

CandidateFromFreelancerTableRow.defaultProps = {
  date: "",
  name: "",
  email: "",
  platform: "",
  salary: "",
  companies: "",
  recruiter: ""
};

export default CandidateFromFreelancerTableRow;
