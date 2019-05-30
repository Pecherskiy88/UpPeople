import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Col, Row, TabPane } from "reactstrap";
import { AppSwitch } from "@coreui/react";
// Components
import CandidatesForm from "./Form";
import CandidatesTable from "./Table";
import CandidatesFromFreelancersTable from "./FromFreelancers/Table";
import Tabs from "../shared/Tabs/Tabs";
import Select from "../shared/Select";
// Context Provider
import Localization from "../../providers/Localization";
// Instruments
import {
  getCandidates,
  getCandidatesFromFreelancers,
  filterAndSortAllCandidates
} from "../../utils/api/candidates";
import {
  sendCandidateResume,
  cancelCandidateFromFreelancer
} from "../../utils/api/candidate";

const tabs = [
  {
    id: "1",
    name: "All candidates"
  },
  {
    id: "2",
    name: "Candidates from freelancers"
  }
];

const localesCandidates = [
  "Date",
  "Platform",
  "Name",
  "Email",
  "Salary",
  "Companies",
  "Recruiter"
];

export default class Candidates extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      role: PropTypes.number.isRequired,
      companyId: PropTypes.number
    })
  };

  state = {
    candidatesData: {
      candidates: [],
      candidatesCount: null,
      totalPages: null,
      perPage: null,
      currentPage: 1,
      platforms: [],
      companies: [],
      statuses: [],
      recruiters: []
    },
    candidatesFromFreelancersData: {
      candidatesFF: [],
      candidatesCountFF: null,
      totalPagesFF: null,
      perPageFF: null,
      currentPageFF: 1
    },
    filterAndSortCandidates: {
      search: "",
      dateFrom: "",
      dateTo: "",
      selectCompanies: [],
      selectPlatforms: [],
      selectStatuses: [],
      selectRecruiter: "",
      mySent: false
    },
    filterAndSortCandidatesFF: {
      search: "",
      dateFrom: "",
      dateTo: "",
      selectCompanies: [],
      selectPlatforms: [],
      selectRecruiter: ""
    },
    dataForSendResumeForm: {},
    isActive: true
  };

  componentDidMount() {
    const {
      user: { role }
    } = this.props;

    const {
      candidatesData: { currentPage }
    } = this.state;

    role !== 4 && role !== 5
      ? this.requestForCandidatesForStaff(currentPage)
      : this.requestForCandidates(currentPage);
  }

  requestForCandidatesForStaff = currentPage => {
    getCandidates(currentPage).then(candidatesData => {
      // console.log(candidatesData);
      this.setState({
        candidatesData: { ...this.state.candidatesData, ...candidatesData }
      });
    });

    getCandidatesFromFreelancers(currentPage).then(
      candidatesFromFreelancersData => {
        this.setState({
          candidatesFromFreelancersData: {
            ...this.state.candidatesFromFreelancersData,
            ...candidatesFromFreelancersData
          }
        });
      }
    );
  };

  requestForCandidates = currentPage => {
    getCandidates(currentPage).then(candidatesData => {
      this.setState({
        candidatesData: { ...this.state.candidatesData, ...candidatesData }
      });
    });
  };

  handleRecruiterChange = value => {
    const { filterAndSortCandidates } = this.state;

    this.setState(
      {
        filterAndSortCandidates: {
          ...filterAndSortCandidates,
          selectRecruiter: value
        }
      },
      () => {
        const { filterAndSortCandidates } = this.state;
        this.filterAndSortCandidates(filterAndSortCandidates);
      }
    );
  };

  filterAndSortCandidates = filterAndSort => {
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

        filterAndSortAllCandidates(currentPage, filterAndSortCandidates).then(
          candidatesData =>
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

  onChangePage = currentPage => {
    const { filterAndSortCandidates } = this.state;

    filterAndSortAllCandidates(currentPage, filterAndSortCandidates).then(
      candidatesData =>
        this.setState({
          candidatesData: {
            ...this.state.candidatesData,
            ...candidatesData
          }
        })
    );
  };

  toggleMySent = () => {
    this.setState(
      state => ({
        filterAndSortCandidates: {
          ...state.filterAndSortCandidates,
          mySent: !state.filterAndSortCandidates.mySent
        }
      }),
      () => {
        const {
          candidatesData: { currentPage },
          filterAndSortCandidates
        } = this.state;

        filterAndSortAllCandidates(currentPage, filterAndSortCandidates).then(
          candidatesData =>
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

  toggleIsActive = () => {
    this.setState(
      state => ({
        isActive: !state.isActive
      }),
      () => console.log(this.state.isActive)
    );
  };

  sendResume = (id, content) => {
    sendCandidateResume(id, content);

    this.setState(prevState => ({
      candidatesFromFreelancersData: {
        candidatesFF: prevState.candidatesFromFreelancersData.candidatesFF.filter(
          candidate => candidate.id !== id
        )
      }
    }));
  };

  rejectCandidate = (id, content) => {
    console.log(content);
    cancelCandidateFromFreelancer(id, content).then(data => {
      console.log(data);
      data
        ? this.setState(prevState => ({
            candidatesFromFreelancersData: {
              candidatesFF: prevState.candidatesFromFreelancersData.candidatesFF.filter(
                candidate => candidate.id !== id
              )
            }
          }))
        : console.log(data);
    });
  };

  render() {
    const {
      candidatesData: {
        candidates,
        candidatesCount,
        totalPages,
        perPage,
        currentPage,
        statuses,
        platforms,
        companies,
        recruiters
      },
      candidatesFromFreelancersData: {
        candidatesFF,
        candidatesCountFF,
        totalPagesFF,
        perPageFF,
        currentPageFF
      },
      filterAndSortCandidates: { selectRecruiter, mySent }
    } = this.state;
    const {
      user: { role }
    } = this.props;

    return (
      <>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 200,
              marginBottom: "0.5rem"
            }}
          >
            <h1 style={{ marginBottom: 0, fontSize: 24 }}>Candidates</h1>
            <span
              style={{
                alignSelf: "flex-end",
                color: "var(--gray)"
              }}
            >
              {candidatesCount}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <CandidatesForm
              userRole={role}
              platforms={platforms}
              companies={companies}
              statuses={statuses}
              onFilter={this.filterAndSortCandidates}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          {role !== 4 ? (
            <Col lg={6} md={6} sm={4} xs={6}>
              <Link
                to="/new-candidate"
                className="btn btn-success pull-left"
                style={{ marginRight: "0.4rem" }}
              >
                <i className="fa fa-plus-circle" /> Create
              </Link>
              <Button color="light" onClick={() => null}>
                Export
              </Button>
            </Col>
          ) : (
            <Col>
              <Link to="/new-candidate" className="btn btn-success pull-left">
                <i className="fa fa-plus-circle" /> Create
              </Link>
            </Col>
          )}
          {role !== 4 ? (
            <>
              <Col lg={3} md={3} sm={4} xs={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    margin: "0 0.5rem",
                    padding: "0.5rem",
                    color: "var(--gray)"
                  }}
                  className="my-events"
                >
                  <AppSwitch
                    className="mx-1"
                    color="primary"
                    checked={mySent}
                    onChange={this.toggleMySent}
                  />
                  My Sent
                </div>
              </Col>
              <Col lg={3} md={3} sm={4} xs={12}>
                <Select
                  value={selectRecruiter}
                  options={recruiters}
                  placeholder="Choose recruiter"
                  onChange={this.handleRecruiterChange}
                />
              </Col>
            </>
          ) : null}
        </Row>
        <Row>
          <Col>
            {role !== 4 ? (
              <Tabs tabs={tabs} onClick={this.toggleIsActive}>
                <TabPane tabId="1">
                  <Localization
                    locales={localesCandidates}
                    onSort={this.filterAndSortCandidates}
                  >
                    {candidates.length > 0 && (
                      <CandidatesTable
                        userRole={role}
                        candidates={candidates}
                        statuses={statuses}
                        headerColumns={localesCandidates}
                        totalItems={candidatesCount}
                        pageSize={perPage}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onChangePage={this.onChangePage}
                      />
                    )}
                  </Localization>
                </TabPane>
                <TabPane tabId="2">
                  <Localization
                    locales={localesCandidates}
                    onSort={this.filterAndSortCandidates}
                  >
                    <CandidatesFromFreelancersTable
                      candidates={candidatesFF}
                      statuses={statuses}
                      totalItems={candidatesCountFF}
                      pageSize={perPageFF}
                      totalPages={totalPagesFF}
                      currentPage={currentPageFF}
                      onChangePage={this.onChangePage}
                      onSendResume={this.sendResume}
                      onRejectCandidate={this.rejectCandidate}
                    />
                  </Localization>
                </TabPane>
              </Tabs>
            ) : (
              <Localization
                locales={localesCandidates}
                onSort={this.filterAndSortCandidates}
              >
                {candidates.length > 0 && (
                  <CandidatesTable
                    userRole={role}
                    candidates={candidates}
                    statuses={statuses}
                    headerColumns={localesCandidates}
                    totalItems={candidatesCount}
                    pageSize={perPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onChangePage={this.onChangePage}
                  />
                )}
              </Localization>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
