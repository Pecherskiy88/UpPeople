// Core
import React, { Component } from "react";
import { Col, Row, TabPane } from "reactstrap";
// Components
import Links from "./Links";
import ListCandidatesInterview from "./ListCandidatesInterview";
import ListCandidates from "./ListCandidates";
import CandidatesForm from "../Candidates/Form";
import CandidatesTable from "../Candidates/Table";
import Tabs from "../shared/Tabs/Tabs";
// Context
import Localization from "../../providers/Localization";
// Instruments
import {
  getDataForRecruiterDashboard,
  filterAndSortRecruiterCandidates
} from "../../utils/api";

const tabs = [
  { id: "1", name: "Interviews" },
  { id: "2", name: "Reviews" },
  { id: "3", name: "Tests" },
  { id: "4", name: "Offers" }
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

export default class DashboardRecruiter extends Component {
  state = {
    dashboardData: {
      links: [],
      listAllCandInterview: [],
      listAllCandOffer: [],
      listAllCandReview: [],
      listAllCandTest: []
    },
    candidatesData: {
      candidates: [],
      candidatesCount: null,
      totalPages: null,
      perPage: null,
      currentPage: 1,
      platforms: [],
      companies: [],
      statuses: [],
      recruiter: []
    },
    filterAndSortCandidates: {
      search: "",
      dateFrom: "",
      dateTo: "",
      selectCompanies: [],
      selectPlatforms: [],
      selectStatuses: []
    },
    dropdownOpen: false
  };

  componentDidMount() {
    const { filterAndSortCandidates } = this.state;
    getDataForRecruiterDashboard().then(dashboardData => {
      if (dashboardData) {
        this.setState({
          ...this.state,
          dashboardData
        });
      }
    });

    filterAndSortRecruiterCandidates(1, filterAndSortCandidates).then(
      candidatesData => {
        if (candidatesData) {
          this.setState({
            ...this.state,
            candidatesData
          });
        }
      }
    );
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

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

        filterAndSortRecruiterCandidates(
          currentPage,
          filterAndSortCandidates
        ).then(candidatesData => {
          this.setState({
            ...this.state,
            candidatesData
          });
        });
      }
    );
  };

  onChangePage = currentPage => {
    const { filterAndSortCandidates } = this.state;

    filterAndSortRecruiterCandidates(currentPage, filterAndSortCandidates).then(
      candidatesData => {
        this.setState({
          ...this.state,
          candidatesData
        });
      }
    );
  };

  render() {
    console.log(this.state);
    const {
      dashboardData: {
        links,
        listAllCandInterview,
        listAllCandOffer,
        listAllCandReview,
        listAllCandTest
      },
      candidatesData: {
        candidates,
        candidatesCount,
        totalPages,
        perPage,
        currentPage,
        platforms,
        companies,
        statuses
      }
    } = this.state;
    const { role } = this.props.user;

    const interviewsCount = listAllCandInterview.length;
    const reviewsCount = listAllCandReview.length;
    const testsCount = listAllCandTest.length;
    const offersCount = listAllCandOffer.length;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" xl="12">
            <Links links={links} text="links" color="primary" />
          </Col>
        </Row>
        <Tabs
          tabs={tabs}
          interviewsCount={interviewsCount}
          reviewsCount={reviewsCount}
          testsCount={testsCount}
          offersCount={offersCount}
        >
          <TabPane tabId="1">
            <Row>
              <Col xs="12" md="12" xl="12">
                <ListCandidatesInterview candidates={listAllCandInterview} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col xs="12" md="12" xl="12">
                <ListCandidates candidates={listAllCandReview} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col xs="12" md="12" xl="12">
                <ListCandidates candidates={listAllCandTest} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col xs="12" md="12" xl="12">
                <ListCandidates candidates={listAllCandOffer} />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row>
          <Col xl={12}>
            <CandidatesForm
              platforms={platforms}
              companies={companies}
              statuses={statuses}
              onFilter={this.filterAndSortCandidates}
            />
          </Col>
        </Row>
        <Row>
          <Col>
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
          </Col>
        </Row>
      </div>
    );
  }
}
