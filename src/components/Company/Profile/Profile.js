// Core
import React, { Component } from "react";
import { Col, Row, TabPane } from "reactstrap";
// Components
import Tabs from "../../shared/Tabs/Tabs";
import CompanyProfileCard from "./Card";
import CompanyProfileContacts from "./Contacts/List";
import CompanyProfileCooperation from "./Cooperation";
import CompanyProfileInfo from "./Info";
import CompanyProfileVacancies from "./Vacancies/Vacancies";
import CompanyProfileCandidates from "./Candidates/Candidates";
import CompanyProfileComments from "./Comments/Comments";
import CompanyProfileSettingsForm from "./SettingsForm";
import Calendar from "../../shared/Calendar";
// Context
import Localization from "../../../providers/Localization";
// Instruments
import { getBase64 } from "../../../utils/selectors";
import {
  getCompanyInfo,
  getCompanyCandidates,
  getCompanyComments,
  filterAndSortCompanyVacancies,
  filterAndSortCompanyCandidates,
  uploadCompanyLogo,
  updateCompanyInfo,
  updateCompanyInfoProfile,
  updateVacancyStatus,
  updateCandidateStatus,
  addUserComment,
  deleteUserComment,
  addCompanyContact,
  editCompanyContact,
  deleteCompanyContact
} from "../../../utils/api/company";

const tabs = [
  { id: "1", name: "Information" },
  { id: "2", name: "Calendar" },
  { id: "3", name: "Vacancies" },
  { id: "4", name: "Candidates" },
  { id: "5", name: "Comments" },
  { id: "6", name: "Settings" }
];

const tabsForPartner = [
  { id: "1", name: "Information" },
  { id: "2", name: "Calendar" },
  { id: "3", name: "Vacancies" },
  { id: "4", name: "Candidates" }
];

const localesCandidates = ["Recruiter", "Platform", "Name", "Date", "Salary"];
const localesVacancies = ["Platform", "Seniority", "Details", "Date"];

export default class CompanyProfile extends Component {
  state = {
    companyInfo: {
      name: "",
      logo: null,
      phone: "",
      email: "",
      skype: "",
      about: null,
      map: "",
      calendarEvents: [],
      sendDetails: null,
      interviewDetails: null,
      sending: null,
      termsOfCooperation: "",
      contacts: [],
      managers: []
    },
    vacanciesData: {
      vacancies: [],
      vacanciesCount: null,
      totalPages: null,
      perPage: null,
      currentPage: 1,
      vacancyStatus: [],
      candidateStatus: [],
      platform: [],
      seniority: []
    },
    candidatesData: {
      candidates: [],
      candidatesCount: null,
      totalPages: null,
      perPage: null,
      currentPage: 1,
      candidateStatus: [],
      platform: []
    },
    comments: [],
    filterAndSortVacancies: {
      inputDate: "",
      selectPlatforms: [],
      selectSeniorities: [],
      selectStatuses: [
        { id: 0, label: "Hot", value: "hot" },
        { id: 1, label: "Open", value: "open" }
      ],
      currentColumn: "",
      sort: null
    },
    filterAndSortCandidates: {
      email: "",
      name: "",
      date: "",
      selectPlatforms: [],
      selectStatuses: [],
      currentColumn: "",
      sort: null
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { role, companyId } = this.props.user;
    const { filterAndSortVacancies } = this.state;
    const vacanciesCurrentPage = this.state.vacanciesData.currentPage;
    const candidatesCurrentPage = this.state.candidatesData.currentPage;

    role !== 5
      ? getCompanyInfo(id).then(companyInfo => {
          this.setState({ ...this.state, companyInfo });
        })
      : getCompanyInfo(companyId).then(companyInfo => {
          companyInfo && this.setState({ ...this.state, companyInfo });
        });

    filterAndSortCompanyVacancies(
      id,
      vacanciesCurrentPage,
      filterAndSortVacancies
    ).then(vacanciesData => this.setState({ ...this.state, vacanciesData }));

    getCompanyCandidates(id, candidatesCurrentPage).then(candidatesData => {
      this.setState({ ...this.state, candidatesData });
    });

    getCompanyComments(id).then(comments => this.setState({ comments }));
  }

  filterAndSortVacancies = filterAndSort => {
    const { id } = this.props.match.params;
    const { filterAndSortVacancies } = this.state;

    this.setState(
      {
        filterAndSortVacancies: {
          ...filterAndSortVacancies,
          ...filterAndSort
        }
      },
      () => {
        const {
          vacanciesData: { currentPage },
          filterAndSortVacancies
        } = this.state;

        filterAndSortCompanyVacancies(
          id,
          currentPage,
          filterAndSortVacancies
        ).then(vacanciesData =>
          this.setState({
            vacanciesData: {
              ...this.state.vacanciesData,
              ...vacanciesData
            }
          })
        );
      }
    );
  };

  filterAndSortCandidates = filterAndSort => {
    const { id } = this.props.match.params;
    const { filterAndSortCandidates } = this.state;

    this.setState(
      {
        filterAndSortCandidates: {
          ...filterAndSortCandidates,
          ...filterAndSort
        }
      },
      () => {
        const {
          candidatesData: { currentPage },
          filterAndSortCandidates
        } = this.state;

        filterAndSortCompanyCandidates(
          id,
          currentPage,
          filterAndSortCandidates
        ).then(candidatesData =>
          this.setState({
            candidatesData: {
              ...this.state.candidatesData,
              ...candidatesData
            }
          })
        );
      }
    );
  };

  updateCompanyProfile = companyInfo => {
    const { id } = this.props.match.params;

    updateCompanyInfo(id, companyInfo);
  };

  handleLogoSelected = ({ target }) => {
    const logo = target.files[0];

    getBase64(logo, result => {
      this.setState({
        companyInfo: {
          ...this.state.companyInfo,
          logo: result
        }
      });
    });
  };

  handleUploadLogo = () => {
    const { id } = this.props.match.params;
    const {
      companyInfo: { logo }
    } = this.state;

    uploadCompanyLogo(id, logo).then(data => console.log(data));
  };

  addComment = comment => {
    const { id } = this.props.match.params;

    addUserComment(id, comment).then(newComment =>
      this.setState({
        comments: [newComment, ...this.state.comments]
      })
    );
  };

  deleteComment = commentId => {
    const { id } = this.props.match.params;

    deleteUserComment(id, commentId);

    this.setState({
      comments: this.state.comments.filter(comment => comment.id !== commentId)
    });
  };

  addContact = contact => {
    const { id } = this.props.match.params;

    addCompanyContact(id, contact).then(contacts =>
      this.setState({ companyInfo: { ...this.state.companyInfo, contacts } })
    );
  };

  editContact = (id, editedContact) => {
    editCompanyContact(id, editedContact);

    this.setState({
      companyInfo: {
        ...this.state.companyInfo,
        contacts: this.state.companyInfo.contacts.map(contact =>
          contact.id === id ? editedContact : contact
        )
      }
    });
  };

  deleteContact = id => {
    deleteCompanyContact(id);

    this.setState({
      companyInfo: {
        ...this.state.companyInfo,
        contacts: this.state.companyInfo.contacts.filter(
          contact => contact.id !== id
        )
      }
    });
  };

  updateCompanyProfileContent = content => {
    const { id } = this.props.match.params;

    updateCompanyInfoProfile(id, content).then(updatedContent =>
      this.setState({
        companyInfo: {
          ...this.state.companyInfo,
          ...updatedContent
        }
      })
    );
  };

  changeVacancyStatus = content => {
    updateVacancyStatus(content).then(data => console.log(data));
  };

  changeCandidateStatus = content => {
    updateCandidateStatus(content).then(data => console.log(data));
  };

  onChangePageVacancies = currentPage => {
    const { id } = this.props.match.params;
    const { filterAndSortVacancies } = this.state;

    filterAndSortCompanyVacancies(id, currentPage, filterAndSortVacancies).then(
      vacanciesData =>
        this.setState({
          vacanciesData: {
            ...this.state.vacanciesData,
            ...vacanciesData
          }
        })
    );
  };

  onChangePageCandidates = currentPage => {
    const { id } = this.props.match.params;
    const { filterAndSortCandidates } = this.state;

    filterAndSortCompanyCandidates(
      id,
      currentPage,
      filterAndSortCandidates
    ).then(candidatesData =>
      this.setState({
        candidatesData: {
          ...this.state.candidatesData,
          ...candidatesData
        }
      })
    );
  };

  render() {
    const {
      companyInfo: { name, logo, calendarEvents, termsOfCooperation, contacts },
      vacanciesData,
      candidatesData,
      comments
    } = this.state;
    const {
      user: { role }
    } = this.props;

    const vacanciesCount = vacanciesData && vacanciesData.vacanciesCount;
    const candidatesCount = candidatesData && candidatesData.candidatesCount;
    const commentsCount = comments && comments.length;

    return (
      <>
        <Row>
          <Col md={3}>
            <CompanyProfileCard
              name={name}
              logo={logo}
              onSelectLogo={this.handleLogoSelected}
              onUploadLogo={this.handleUploadLogo}
            />
            <CompanyProfileContacts
              contacts={contacts}
              onAddContact={this.addContact}
              onEditContact={this.editContact}
              onDeleteContact={this.deleteContact}
            />
            <CompanyProfileCooperation
              termsOfCooperation={termsOfCooperation}
            />
          </Col>
          <Col md={9}>
            {role !== 5 ? (
              <Tabs
                tabs={tabs}
                vacanciesCount={vacanciesCount}
                candidatesCount={candidatesCount}
                commentsCount={commentsCount}
              >
                <TabPane tabId="1">
                  <CompanyProfileInfo
                    companyInfo={this.state.companyInfo}
                    onUpdate={this.updateCompanyProfileContent}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col xl={12}>
                      <Calendar events={calendarEvents} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Localization
                    locales={localesVacancies}
                    onSort={this.filterAndSortVacancies}
                  >
                    <CompanyProfileVacancies
                      vacanciesData={vacanciesData}
                      onChangePage={this.onChangePageVacancies}
                      onChangeVacancyStatus={this.changeVacancyStatus}
                      onFilterVacancies={this.filterAndSortVacancies}
                    />
                  </Localization>
                </TabPane>
                <TabPane tabId="4">
                  <Localization
                    locales={localesCandidates}
                    onSort={this.filterAndSortCandidates}
                  >
                    <CompanyProfileCandidates
                      candidatesData={candidatesData}
                      onChangePage={this.onChangePageCandidates}
                      onChangeCandidateStatus={this.changeCandidateStatus}
                      onFilterCandidates={this.filterAndSortCandidates}
                    />
                  </Localization>
                </TabPane>
                <TabPane tabId="5">
                  <Row>
                    <Col xl={12}>
                      <CompanyProfileComments
                        comments={comments}
                        onAddComment={this.addComment}
                        onDeleteComment={this.deleteComment}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <Row>
                    <Col xl={12}>
                      <CompanyProfileSettingsForm
                        companyInfo={this.state.companyInfo}
                        onUpdateCompanyProfile={this.updateCompanyProfile}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            ) : (
              <Tabs
                tabs={tabsForPartner}
                vacanciesCount={vacanciesCount}
                candidatesCount={candidatesCount}
              >
                <TabPane tabId="1">
                  <CompanyProfileInfo
                    companyInfo={this.state.companyInfo}
                    onUpdate={this.updateCompanyProfileContent}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col xl={12}>
                      <Calendar events={calendarEvents} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Localization
                    locales={localesVacancies}
                    onSort={this.filterAndSortVacancies}
                  >
                    <CompanyProfileVacancies
                      vacanciesData={vacanciesData}
                      onChangePage={this.onChangePageVacancies}
                      onChangeVacancyStatus={this.changeVacancyStatus}
                      onFilterVacancies={this.filterAndSortVacancies}
                    />
                  </Localization>
                </TabPane>
                <TabPane tabId="4">
                  <Localization
                    locales={localesCandidates}
                    onSort={this.filterAndSortCandidates}
                  >
                    <CompanyProfileCandidates
                      candidatesData={candidatesData}
                      onChangePage={this.onChangePageCandidates}
                      onChangeCandidateStatus={this.changeCandidateStatus}
                      onFilterCandidates={this.filterAndSortCandidates}
                    />
                  </Localization>
                </TabPane>
              </Tabs>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
