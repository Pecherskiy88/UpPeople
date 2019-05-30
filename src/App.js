// Core
import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import { Spinner } from "reactstrap";
// Context
// import AccountProvider from "./providers/AccountProvider";
import ModalProvider, { ModalRoot } from "./providers/ModalProvider";
// Instruments
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <Spinner
      color="info"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    />
  </div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import("./components/pages/Login"),
  loading
});

const Register = Loadable({
  loader: () => import("./components/pages/Register"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./components/pages/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./components/pages/Page500"),
  loading
});

class App extends Component {
  render() {
    return (
      // <AccountProvider>
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={props => <Login {...props} />}
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={Register}
          />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <ModalProvider>
            <ModalRoot />
            <Route
              path="/"
              name="Home"
              render={props => <DefaultLayout {...props} />}
            />
          </ModalProvider>
        </Switch>
      </HashRouter>
      // </AccountProvider>
    );
  }
}

export default hot(module)(App);
