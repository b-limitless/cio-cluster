import React, { Suspense, lazy } from "react";
import { Switch, Route, Router } from "react-router-dom";

const ListUserLazy = lazy(() => import("./components/User/List"));
const AddUserLazy = lazy(() => import("./components/User/Add"));



export default ({ history, onSignIn, isSignedIn }) => {
  return (
    <div>
      <Router history={history}>
        <Switch>
        <Route exact path="/users/add">
            <Suspense fallback={"Please wait...."}>
              <AddUserLazy />
            </Suspense>
          </Route>
          
          <Route path="/users">
            <Suspense fallback={"Please wait...."}>
              <ListUserLazy />
            </Suspense>
          </Route>

        
        </Switch>
      </Router>
    </div>
  );
};
