import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
// Components
import VacanciesForm from "./Form";
import VacanciesTable from "./Table";
// Context Provider
import Localization from "../../providers/Localization";
// Instruments
import { deleteVacancy } from "../../utils/api/vacancy";
import {
  filterAndSortCompanyVacancies,
  updateVacancyStatus
} from "../../utils/api/company";
import "./Vacancies.css";

const localesVacancies = [
  "Company",
  "Platform",
  "Seniority",
  "Location",
  "Salary",
  "Date",
  "Status"
];

export default class Vacancies extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      role: PropTypes.number.isRequired
    })
  };

  state = {
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
    filterAndSortVacancies: {
      selectPlatforms: [],
      selectSeniorities: [],
      selectCandidateStatus: [],
      selectStatuses: [
        { id: 0, label: "Hot", value: "hot" },
        { id: 1, label: "Open", value: "open" }
      ]
    }
  };
  // TODO: удалить дублирующуюся функцию getVacancies в api, заменить на getCompanyVacancies
  componentDidMount() {
    const {
      vacanciesData: { currentPage },
      filterAndSortVacancies
    } = this.state;

    this.updateVacanciesData(currentPage, filterAndSortVacancies);
  }

  updateVacanciesData = (currentPage, filter) => {
    filterAndSortCompanyVacancies(null, currentPage, filter).then(
      vacanciesData => {
        this.setState({
          vacanciesData: { ...this.state.vacanciesData, ...vacanciesData }
        });
      }
    );
  };

  filterAndSortVacancies = filterAndSort => {
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

        this.updateVacanciesData(currentPage, filterAndSortVacancies);
      }
    );
  };

  changeVacancyStatus = content => {
    updateVacancyStatus(content).then(data => console.log(data));
  };

  onDeleteVacancy = id => {
    deleteVacancy(id);

    const { vacanciesData } = this.state;

    this.setState(state => ({
      ...state,
      vacanciesData: {
        ...vacanciesData,
        vacancies: vacanciesData.vacancies.filter(vacancy => vacancy.id !== id)
      }
    }));
  };

  onChangePage = currentPage => {
    const { filterAndSortVacancies } = this.state;

    this.updateVacanciesData(currentPage, filterAndSortVacancies);
  };

  render() {
    const {
      vacanciesData: {
        vacancies,
        vacanciesCount,
        totalPages,
        perPage,
        currentPage,
        vacancyStatus,
        candidateStatus,
        platform,
        seniority
      }
    } = this.state;
    const {
      user: { role }
    } = this.props;

    return (
      <Localization
        locales={localesVacancies}
        onSort={this.filterAndSortVacancies}
      >
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 180,
              marginBottom: "0.5rem"
            }}
          >
            <h1 style={{ marginBottom: 0, fontSize: 24 }}>Vacancies</h1>
            <span
              style={{
                alignSelf: "flex-end",
                color: "var(--gray)"
              }}
            >
              {vacanciesCount}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <VacanciesForm
              userRole={role}
              platform={platform}
              seniority={seniority}
              candidateStatus={candidateStatus}
              vacancyStatus={vacancyStatus}
              onFilter={this.filterAndSortVacancies}
            />
          </Col>
        </Row>
        {role !== 4 ? (
          <Row style={{ marginBottom: "1rem" }}>
            <Col xs={12} sm={6}>
              <Link to="/new-vacancy" className="btn btn-success pull-left">
                <i className="fa fa-plus-circle" /> Create
              </Link>
            </Col>
          </Row>
        ) : null}
        <VacanciesTable
          userRole={role}
          vacancies={vacancies}
          vacancyStatus={vacancyStatus}
          totalItems={vacanciesCount}
          pageSize={perPage}
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={this.onChangePage}
          onChangeVacancyStatus={this.changeVacancyStatus}
          onDeleteVacancy={this.onDeleteVacancy}
        />
      </Localization>
    );
  }
}
