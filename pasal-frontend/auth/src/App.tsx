import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import CreateANewPassword from "./components/CreateANewPassword";

import "./styles";
import VerifyRegisteredAccount from "./components/VerifyRegisteredAccount";
import useUserIsAuthenticated from "./hooks/useUserIsAuthenticated";

interface AppInterface {
  history: any;
  actions: any;
  globalDispatch: any;
}

export default function App({ history, actions, globalDispatch }: AppInterface) {


  useUserIsAuthenticated({history});

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin" render={(props) => <Signin {...props} actions={actions} globalDispatch={globalDispatch} />} />
          <Route path="/auth/signup" component={Signup} />
          <Route path="/auth/forgot-password" component={ForgotPassword} />
          <Route path="/auth/create-a-new-password" component={CreateANewPassword} />
          <Route path="/auth/verify" render={(props) => <VerifyRegisteredAccount {...props} actions={actions} globalDispatch={globalDispatch} />} />
        </Switch>

      </Router>
    </div>
  );
}
