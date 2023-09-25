import React, { Suspense, lazy } from "react";
import { Switch, Route, Router } from "react-router-dom";

const ListOrderLazyLoad = lazy(() => import("./components/order/List"));

interface AppInterface {
  history?: any;
  onSignIn?:Function;
  isSignedIn?:boolean; 
}

export default ({ history, onSignIn, isSignedIn }: AppInterface) => {
  return (
    <div>
      <Router history={history}>
        <Switch>
        <Route exact path="/orders">
            <Suspense fallback={"Please wait...."}>
              <ListOrderLazyLoad />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
