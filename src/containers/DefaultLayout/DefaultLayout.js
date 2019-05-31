// Core
import React, { Component, createContext, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Col, Container, Row, Spinner } from "reactstrap";
import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// Components
import OpenClose from "../../render_prop/OpenClose";
// Context
import { AccountContext } from "../../providers/AccountProvider";
// sidebar nav config
import mainNav from "../../_main_nav";
import adminNav from "../../_admin_nav";
import freelancerNav from "../../_freelancer_nav";
// import partnerNav from "../../_partner_nav";
// routes config
import routes from "../../routes";
import routesForPartner from "../../routes_partner";

//FormInputGlobal test input==========================================
import FormGlobalSearch from "../../components/FormInputGlobal/FormGlobalSearch";
import Results from "../../components/Results/Results";

//FormInputGlobal test input==========================================

const DefaultHeader = React.lazy(() =>
  import("../../components/Header/Header")
);
// const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));

export const GlobalContext = createContext({
  user: {},
  token: null
});

const INITIAL_STATE = { user: {} };

class DefaultLayout extends Component {
  static contextType = AccountContext;

  state = {
    ...INITIAL_STATE,
    globalSearchText: "",
    globalDataObj: {},
    results: false
  };

  componentDidMount() {
    this.checkAuthentication();
  }
  // тестирую инпут ================================
  globalSearchChange = e => {
    let value = e.target.value;
    this.setState({
      globalSearchText: value
    });
  };
  globalSearchSubmit = e => {
    e.preventDefault();
    const obj = { search: this.state.globalSearchText };

    this.setState({
      globalSearchText: "",
      results: !this.state.results
    });
    console.log("object with global search: ", obj);

    const getToken = () => localStorage.getItem("token");
    const token = getToken();
    const URL = "http://192.168.1.88:8000/api";
    fetch(`${URL}/main/globalSearch`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      // .then(data => console.log("data: ", data))
      .then(data =>
        this.setState({
          globalDataObj: data
        })
      )
      .catch(err => console.log(err));
  };
  // тестирую инпут ================================
  loading = () => (
    <Spinner
      color="info"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%"
      }}
    />
  );

  logOut = e => {
    e.preventDefault();
    const { history } = this.props;
    const { signOut } = this.context;

    signOut();

    history.push("/login");
  };

  checkAuthentication = () => {
    const { history } = this.props;
    const token = localStorage.getItem("token");
    !token && history.push("/login");

    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    this.setState({
      user: parsedUser,
      token
    });
  };

  render() {
    const {
      user: { role }
    } = this.state;

    const applyAppSidebarByUserRole = () => {
      switch (role) {
        case 1:
          return (
            <OpenClose
              render={(isOpen, open, close) =>
                isOpen ? (
                  <>
                    <AppSidebarHeader>
                      <Row>
                        <Col lg={9}>Admin navigation</Col>
                        <Col lg={3}>
                          <i
                            className="fa fa-cog fa-lg"
                            style={{ cursor: "pointer" }}
                            onClick={close}
                          />
                        </Col>
                        {/* тестирую инпут ================================ */}
                        <FormGlobalSearch
                          globalSearchText={this.state.globalSearchText}
                          globalSearchChange={this.globalSearchChange}
                          globalSearchSubmit={this.globalSearchSubmit}
                        />
                        {/* тестирую инпут ================================  */}
                      </Row>
                    </AppSidebarHeader>
                    <AppSidebarForm />
                    <AppSidebarNav navConfig={adminNav} {...this.props} />
                    <AppSidebarFooter />
                  </>
                ) : (
                  <>
                    <AppSidebarHeader>
                      <Row>
                        <Col lg={9}>Main navigation</Col>
                        <Col lg={3}>
                          <i
                            className="fa fa-cog fa-lg"
                            style={{ cursor: "pointer" }}
                            onClick={open}
                          />
                        </Col>
                        {/* тестирую инпут ================================  */}
                        <FormGlobalSearch
                          globalSearchText={this.state.globalSearchText}
                          globalSearchChange={this.globalSearchChange}
                          globalSearchSubmit={this.globalSearchSubmit}
                        />
                        {/* тестирую инпут ================================  */}
                      </Row>
                    </AppSidebarHeader>
                    <AppSidebarForm />
                    <AppSidebarNav navConfig={mainNav} {...this.props} />
                    <AppSidebarFooter />
                  </>
                )
              }
            />
          );
        case 2:
          return (
            <>
              <AppSidebarHeader>Main navigation recruiter</AppSidebarHeader>
              <AppSidebarForm />
              <AppSidebarNav navConfig={mainNav} {...this.props} />
              <AppSidebarFooter />
            </>
          );
        case 3:
          return (
            <>
              <AppSidebarHeader>Main navigation manager</AppSidebarHeader>
              <AppSidebarForm />
              <AppSidebarNav navConfig={mainNav} {...this.props} />
              <AppSidebarFooter />
            </>
          );
        case 4:
          return (
            <>
              <AppSidebarHeader>Main navigation freelancer</AppSidebarHeader>
              <AppSidebarForm />
              <AppSidebarNav navConfig={freelancerNav} {...this.props} />
              <AppSidebarFooter />
            </>
          );
        // case 5:
        //   return (
        //     <>
        //       <AppSidebarHeader>Main navigation partner</AppSidebarHeader>
        //       <AppSidebarForm />
        //       <AppSidebarNav navConfig={partnerNav} {...this.props} />
        //       <AppSidebarFooter />
        //     </>
        //   );
        default:
          return null;
      }
    };

    const applyAppBreadcrumbByUserRole = () => {
      switch (role) {
        case 1:
        case 2:
        case 3:
          return <AppBreadcrumb appRoutes={routes} />;
        case 4:
          return <AppBreadcrumb appRoutes={routesForPartner} />;
        default:
          return null;
      }
    };

    const redirectToHomePage = () => {
      switch (this.context.user.role) {
        case 2:
          return <Redirect from="/" to="/dashboardrecruiter" />;
        case 4:
          return <Redirect from="/" to="/candidates" />;
        case 5:
          return (
            <Redirect
              from="/"
              to={`/companies/${this.context.user.companyId}`}
            />
          );
        default:
          return <Redirect from="/" to="/dashboard" />;
      }
    };

    return (
      <div className="app">
        <GlobalContext.Provider value={this.state}>
          <AppHeader
            fixed
            style={{ background: "var(--primary)", color: "var(--white)" }}
          >
            <Suspense fallback={this.loading()}>
              <DefaultHeader
                user={this.state.user}
                onLogout={e => this.logOut(e)}
                {...this.props}
              />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            {role !== 5 && (
              <AppSidebar fixed display="lg">
                {applyAppSidebarByUserRole()}
                <AppSidebarMinimizer />
              </AppSidebar>
            )}
            <main className="main">
              {applyAppBreadcrumbByUserRole()}
              <Container fluid>
                {/* тестирую компонент results======================= */}
                {this.state.results ? (
                  <Results globalDataObj={this.state.globalDataObj} />
                ) : (
                  <Suspense fallback={this.loading()}>
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                              <route.component
                                userContext={this.context.user}
                                user={this.state.user}
                                {...props}
                              />
                            )}
                          />
                        ) : null;
                      })}
                      {redirectToHomePage()}
                      {/* {this.context.user.role !== 5 ? (
                      <Redirect from="/" to="/dashboard" />
                    ) : (
                      <Redirect
                        from="/"
                        to={`/companies/${this.context.user.company_id}`}
                      />
                    )} */}
                    </Switch>
                  </Suspense>
                )}
              </Container>
            </main>
            {/* <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside />
              </Suspense>
            </AppAside> */}
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default DefaultLayout;
