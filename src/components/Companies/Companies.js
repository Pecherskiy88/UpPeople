// Core
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
// Components
import CompaniesForm from "./Form";
import CompaniesList from "./List/List";
import CompaniesTable from "./Table/Table";
// Instruments
import { getCompanies, filterAllCompanies } from "../../utils/api/company";
import "./Companies.css";

export default class Companies extends Component {
  state = {
    companies: [],
    companiesCount: null,
    totalPages: null,
    perPage: null,
    currentPage: 1,
    isActive: true,
    isTable: false,
    filterCompanies: {
      name: "",
      email: "",
      skype: "",
      phone: ""
    }
  };
  // FIXME: sends two requests when component mounts
  componentDidMount() {
    const { currentPage, filterCompanies, isActive } = this.state;

    this.requestForCompanies(currentPage, filterCompanies, isActive);
  }

  requestForCompanies = (currentPage, filter, isActive) => {
    // const { filterCompanies } = this.state;
    getCompanies(currentPage, isActive).then(companiesData => {
      companiesData.currentPage > companiesData.totalPages
        ? this.requestForCompanies(
            1,
            companiesData.filterCompanies,
            companiesData.isActive
          )
        : this.setState({ ...companiesData, filterCompanies: filter });
    });
  };

  handleShowActiveCompanies = isActive => {
    this.setState({ isActive }, () => {
      const { currentPage, filterCompanies, isActive } = this.state;

      this.requestForCompanies(currentPage, filterCompanies, isActive);
    });
  };

  handleShowCompaniesTable = isTable => {
    this.setState({ isTable });
  };

  filterCompanies = filter => {
    // const { filterCompanies } = this.state;

    this.setState({ filterCompanies: filter }, () => {
      const { currentPage, isActive, filterCompanies } = this.state;

      filterAllCompanies(currentPage, isActive, filterCompanies).then(
        companiesData => {
          this.setState({
            ...companiesData
          });
        }
      );
    });
  };

  onChangePage = currentPage => {
    const { isActive, filterCompanies } = this.state;

    this.requestForCompanies(currentPage, filterCompanies, isActive);
  };

  render() {
    const {
      companies,
      companiesCount,
      totalPages,
      perPage,
      currentPage,
      isActive,
      isTable
    } = this.state;

    return (
      <>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 180,
              marginBottom: "0.5rem"
            }}
          >
            <h1 style={{ marginBottom: 0, fontSize: 24 }}>Companies</h1>
            <span
              style={{
                alignSelf: "flex-end",
                color: "var(--gray)"
              }}
            >
              {companiesCount}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <CompaniesForm onFilter={this.filterCompanies} />
          </Col>
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <Col xs={12} sm={6}>
            <Link
              to="/new-company"
              className="btn btn-success"
              style={{ marginRight: "0.5rem" }}
            >
              <i
                style={{ marginRight: "0.2rem" }}
                className="fa fa-plus-circle"
              />
              Create
            </Link>
            <ButtonGroup>
              <Button
                color="light"
                active={isActive}
                onClick={() => this.handleShowActiveCompanies(true)}
              >
                Active
              </Button>
              <Button
                color="light"
                active={!isActive}
                onClick={() => this.handleShowActiveCompanies(false)}
              >
                All
              </Button>
            </ButtonGroup>
          </Col>
          <Col
            xs={12}
            sm={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            {/* <AppSwitch className="mx-1" color="primary" checked />
            <div className="my-events">My Companies</div> */}
            <ButtonGroup>
              <Button
                color="light"
                active={!isTable}
                onClick={() => this.handleShowCompaniesTable(false)}
              >
                <i className="fa fa-th-large" />
              </Button>
              <Button
                color="light"
                active={isTable}
                onClick={() => this.handleShowCompaniesTable(true)}
              >
                <i className="fa fa-th-list" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {isTable ? (
          <CompaniesTable
            companies={companies}
            totalItems={companiesCount}
            pageSize={perPage}
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={this.onChangePage}
          />
        ) : (
          <CompaniesList
            companies={companies}
            totalItems={companiesCount}
            pageSize={perPage}
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={this.onChangePage}
          />
        )}
      </>
    );
  }
}
