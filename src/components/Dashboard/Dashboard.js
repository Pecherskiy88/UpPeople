// Core
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Progress,
  Row,
  Table
} from "reactstrap";
// Components
import DashboardCard from "./Card/Card";
import SparkLineChart from "./SparkLineChart/SparkLineChart";
import DashboardForm from "./SparkLineChart/Form";
// Instruments
import * as cards from "../../assets/data/dashboard/cards";
import { getStyle } from "@coreui/coreui-pro/dist/js/coreui-utilities";
import {
  getDataForAdminDashboard,
  filterDataForAdminDashboard
} from "../../utils/api";
import { isEmpty } from "../../utils/selectors";

const brandPrimary = getStyle("--primary");
// const brandSuccess = getStyle("--success");
// const brandInfo = getStyle("--info");
// const brandWarning = getStyle("--warning");
// const brandDanger = getStyle("--danger");

export default class Dashboard extends Component {
  state = {
    dashboardData: {
      companiesWithCandidates: {},
      vacanciesOnCandidates: {},
      countCandidatesOnVacancies: {},
      countUsersAndFreelancers: {},
      countCompanies: null,
      countVacancies: null,
      countVacanciesOnPlatforms: {},
      worseVacancies: [],
      countOfferCandidates: null,
      usersWithoutOfferCandidates: [],
      usersOnCandidates: [],
      countVacanciesOpenAndHot: {}
    },
    dateFilter: {
      dateFrom: "",
      dateTo: ""
    }
  };

  componentDidMount() {
    getDataForAdminDashboard().then(data => {
      if (data) {
        const dashboardData = {
          companiesWithCandidates: data.countRevInterComp,
          vacanciesOnCandidates: data.countRevInterVac,
          countCandidatesOnVacancies:
            data.countReviewAndInterviewCandidatesOnVacancies,
          countUsersAndFreelancers: data.countUsersAndFreelancer,
          countCompanies: data.countVacanciesOpenAndHot.countCom,
          countVacancies: data.countVacanciesOpenAndHot.countVac,
          countVacanciesOnPlatforms: data.countVacanciesOpenAndHotForPlatform,
          worseVacancies: data.listNotSendVacancies,
          countOfferCandidates: data.offersCandidates.allCount,
          usersWithoutOfferCandidates: data.offersCandidates.users,
          usersOnCandidates: data.topUsers,
          countVacanciesOpenAndHot: data.countVacanciesOpenAndHot
        };

        this.setState({
          ...this.state,
          dashboardData
        });
      }
    });
  }

  filterData = filter => {
    this.setState(
      {
        dateFilter: filter
      },
      () => {
        const { dateFilter } = this.state;

        filterDataForAdminDashboard(dateFilter).then(data => {
          const dashboardData = {
            companiesWithCandidates: data.countRevInterComp,
            vacanciesOnCandidates: data.countRevInterVac,
            countCandidatesOnVacancies:
              data.countReviewAndInterviewCandidatesOnVacancies,
            countUsersAndFreelancers: data.countUsersAndFreelancer,
            countCompanies: data.countVacanciesOpenAndHot.countCom,
            countVacancies: data.countVacanciesOpenAndHot.countVac,
            countVacanciesOnPlatforms: data.countVacanciesOpenAndHotForPlatform,
            worseVacancies: data.listNotSendVacancies,
            countOfferCandidates: data.offersCandidates.allCount,
            usersWithoutOfferCandidates: data.offersCandidates.users,
            usersOnCandidates: data.topUsers,
            countVacanciesOpenAndHot: data.countVacanciesOpenAndHot
          };

          this.setState({
            ...this.state,
            dashboardData
          });
        });
      }
    );
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const {
      dashboardData: {
        countCompanies,
        countVacancies,
        countUsersAndFreelancers,
        countVacanciesOnPlatforms,
        companiesWithCandidates,
        vacanciesOnCandidates,
        countCandidatesOnVacancies,
        usersOnCandidates,
        countOfferCandidates,
        usersWithoutOfferCandidates,
        worseVacancies
      }
    } = this.state;

    const amountRecruiters = !isEmpty(countUsersAndFreelancers)
      ? countUsersAndFreelancers.Recruiter
      : null;

    const amountFreelancers = !isEmpty(countUsersAndFreelancers)
      ? countUsersAndFreelancers.Freelancer
      : null;

    const amountVacancies =
      !isEmpty(countVacanciesOnPlatforms) &&
      Object.values(countVacanciesOnPlatforms).reduce(
        (acc, value) => acc + value,
        0
      );

    // sorts an array with numbers, but it's completely not that we want
    // const arrValues =
    //   !isEmpty(this.state.dashboardData) &&
    //   descSort(Object.values(countVacanciesOnPlatforms));

    const amountVacanciesOnPlatformsJSX =
      amountVacancies &&
      Object.keys(countVacanciesOnPlatforms).map(key => {
        const vacanciesOnPlatform = countVacanciesOnPlatforms[key];

        const pct = ((vacanciesOnPlatform / amountVacancies) * 100).toFixed(1);

        return (
          <li key={key} className="progress-group">
            <div className="progress-group-header">
              <i className="icon-globe progress-group-icon" />
              <span className="title">{key}</span>
              <span className="ml-auto font-weight-bold">
                {countVacanciesOnPlatforms[key]}{" "}
                <span className="text-muted small">
                  ({pct}
                  {"%"})
                </span>
              </span>
            </div>
            <div className="progress-group-bars">
              <Progress className="progress-xs" color="success" value={pct} />
            </div>
          </li>
        );
      });

    const sparkLineChartDataCompanies = !isEmpty(companiesWithCandidates)
      ? companiesWithCandidates
      : {};

    const sparkLineChartDataVacancies = !isEmpty(vacanciesOnCandidates)
      ? vacanciesOnCandidates
      : {};

    const candidatesOnStatus =
      !isEmpty(countCandidatesOnVacancies) && countCandidatesOnVacancies;

    const { Review, Interview } = candidatesOnStatus;

    const usersWithCandidatesOnReviewStatus =
      usersOnCandidates.length > 0 &&
      usersOnCandidates.reduce((acc, user) => {
        if (acc) {
          user.role !== "Admin" && user.status === "Review" && acc.push(user);
        }

        return acc;
      }, []);

    const amountReviewCandidates =
      usersWithCandidatesOnReviewStatus.length > 0 &&
      usersWithCandidatesOnReviewStatus.reduce(
        (acc, user) => acc + user.count,
        0
      );

    const usersWithCandidatesOnReviewStatusJSX =
      usersWithCandidatesOnReviewStatus.length > 0 &&
      usersWithCandidatesOnReviewStatus.map(user => {
        const pct = ((user.count / amountReviewCandidates) * 100).toFixed();

        return (
          <tr key={user.id}>
            <td className="text-center">
              <div className="avatar">
                <img
                  src={"assets/img/avatars/1.jpg"}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="avatar-status badge-success" />
              </div>
            </td>
            <td>
              <div>{user.name}</div>
              {/* <div className="small text-muted">
                <span>New</span> | Registered: Jan 1, 2015
              </div> */}
            </td>
            <td className="text-center">{user.role}</td>
            <td>
              <div className="clearfix">
                <div className="float-left">
                  <strong>{`${user.count} (${String(pct)}%)`}</strong>
                </div>
                <div className="float-right">
                  <small className="text-muted">
                    on {moment().format("MMMM YYYY")}
                  </small>
                </div>
              </div>
              <Progress
                className="progress-xs"
                color="success"
                value={`${String(pct)}`}
              />
            </td>
          </tr>
        );
      });

    const usersWithCandidatesOnInterviewStatus =
      usersOnCandidates.length > 0 &&
      usersOnCandidates.reduce((acc, user) => {
        if (acc) {
          user.role !== "Admin" &&
            user.status === "Interview" &&
            acc.push(user);
        }

        return acc;
      }, []);

    const amountInterviewCandidates =
      usersWithCandidatesOnInterviewStatus.length > 0 &&
      usersWithCandidatesOnInterviewStatus.reduce(
        (acc, user) => acc + user.count,
        0
      );

    const usersWithCandidatesOnInterviewStatusJSX =
      usersWithCandidatesOnInterviewStatus.length > 0 &&
      usersWithCandidatesOnInterviewStatus.map(user => {
        const pct = ((user.count / amountInterviewCandidates) * 100).toFixed();

        return (
          <tr key={user.id}>
            <td className="text-center">
              <div className="avatar">
                <img
                  src={"assets/img/avatars/1.jpg"}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="avatar-status badge-success" />
              </div>
            </td>
            <td>
              <div>{user.name}</div>
              {/* <div className="small text-muted">
                <span>New</span> | Registered: Jan 1, 2015
              </div> */}
            </td>
            <td className="text-center">{user.role}</td>
            <td>
              <div className="clearfix">
                <div className="float-left">
                  <strong>{`${user.count} (${String(pct)}%)`}</strong>
                </div>
                <div className="float-right">
                  <small className="text-muted">
                    on {moment().format("MMMM YYYY")}
                  </small>
                </div>
              </div>
              <Progress
                className="progress-xs"
                color="success"
                value={`${String(pct)}`}
              />
            </td>
          </tr>
        );
      });

    const listOfWorstVacancies =
      worseVacancies.length > 0 &&
      worseVacancies.map(vacancy => (
        <tr key={vacancy.id}>
          <td>
            <Link to={`/vacancies/${vacancy.id}`}>{vacancy.vacancy}</Link>
          </td>
        </tr>
      ));

    const listOfWorstUsers =
      usersWithoutOfferCandidates.length > 0 &&
      usersWithoutOfferCandidates.map(user => (
        <tr key={user.id}>
          <td>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </td>
        </tr>
      ));

    return (
      <div className="animated fadeIn">
        <DashboardForm onFilter={this.filterData} />
        <Row>
          <Col xs="12" sm="12" md="4" lg="4">
            <DashboardCard card={cards.candidates} amount={Review} />
          </Col>

          <Col xs="12" sm="12" md="4" lg="4">
            <DashboardCard card={cards.interviews} amount={Interview} />
          </Col>
          <Col xs="12" sm="12" md="4" lg="4">
            <DashboardCard
              card={cards.offerCandidates}
              amount={countOfferCandidates}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>Amount of vacancies in Open/Hot status</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="12" xl="12">
                    <Row>
                      {/* <Col sm="6">
                        <div className="callout callout-warning">
                          <small className="text-muted">Pageviews</small>
                          <br />
                          <strong className="h4">78,623</strong>
                          <div className="chart-wrapper">
                            <Line
                              data={makeSparkLineData(2, brandWarning)}
                              options={sparklineChartOpts}
                              width={100}
                              height={30}
                            />
                          </div>
                        </div>
                      </Col> */}
                      <Col sm="12">
                        <div className="callout callout-success">
                          <small className="text-muted">
                            {"Vacancies".toUpperCase()}
                          </small>
                          <br />
                          <strong className="h4">{amountVacancies}</strong>
                          {/* <div className="chart-wrapper">
                            <Line
                              data={makeSparkLineData(3, brandSuccess)}
                              options={sparklineChartOpts}
                              width={100}
                              height={30}
                            />
                          </div> */}
                        </div>
                      </Col>
                    </Row>
                    <hr className="mt-0" />
                    <ul className="pl-0">
                      {amountVacanciesOnPlatformsJSX}
                      <div className="divider text-center">
                        <Button
                          color="link"
                          size="sm"
                          className="text-muted"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="show more"
                        >
                          <i className="icon-options" />
                        </Button>
                      </div>
                    </ul>
                  </Col>
                </Row>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <SparkLineChart
              title="Companies with candidates in Review/Interview status"
              data={sparkLineChartDataCompanies}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <SparkLineChart
              title="Vacancies with candidates in Review/Interview status"
              data={sparkLineChartDataVacancies}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" md="6" lg="3">
            <DashboardCard
              card={cards.companies}
              amount={countCompanies}
              brandPrimary={brandPrimary}
            />
          </Col>
          <Col xs="12" sm="6" md="6" lg="3">
            <DashboardCard card={cards.vacancies} amount={countVacancies} />
          </Col>
          <Col xs="12" sm="6" md="6" lg="3">
            <DashboardCard card={cards.recruiters} amount={amountRecruiters} />
          </Col>
          <Col xs="12" sm="6" md="6" lg="3">
            <DashboardCard
              card={cards.freelancers}
              amount={amountFreelancers}
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" md="6" lg="6" xl="6">
            <Card>
              <CardHeader>Users with candidates in Review status</CardHeader>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                        <i className="icon-people" />
                      </th>
                      <th>User</th>
                      <th className="text-center">Role</th>
                      <th>Pct</th>
                    </tr>
                  </thead>
                  <tbody>{usersWithCandidatesOnReviewStatusJSX}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="12" md="6" lg="6" xl="6">
            <Card>
              <CardHeader>Users with candidates in Interview status</CardHeader>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                        <i className="icon-people" />
                      </th>
                      <th>User</th>
                      <th className="text-center">Role</th>
                      <th>Pct</th>
                    </tr>
                  </thead>
                  <tbody>{usersWithCandidatesOnInterviewStatusJSX}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <Card>
              <CardHeader>
                Vacancies on which didn't send any candidate at last 10 days
              </CardHeader>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <tbody>{listOfWorstVacancies}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <Card>
              <CardHeader>
                Users who don't have candidates with offer at last 60 days
              </CardHeader>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-none d-sm-table"
                >
                  <tbody>{listOfWorstUsers}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
