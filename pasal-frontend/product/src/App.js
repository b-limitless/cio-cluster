import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Thread from "./components/Thread";
import Febric from "./components/Febric/Febric";
import AddFebric from "./components/Febric/Add";


export default ({ history, onSignIn, isSignedIn }) => {

  return (
    <div>
        <Router history={history}>
          <Switch>
          <Route path="/products/febric/add">
              <AddFebric/>
            </Route>
            <Route path="/products/febric">
              <Febric/>
            </Route>
            
            <Route path="/products/thread">
              <Thread/>
            </Route>
          </Switch>
        </Router>
    
    </div>
  );
};
