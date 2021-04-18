import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import getSessionToken from "lib/getSessionToken";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const Routes = () => {
  console.log(getSessionToken())
  return (
    <Router>
      <Switch>
        <PrivateRoute component={HomePage} path={'/home'} />
        <PublicRoute restricted component={LoginPage} path={'/'} exact />
      </Switch>
    </Router>
  );
};
export default Routes;
