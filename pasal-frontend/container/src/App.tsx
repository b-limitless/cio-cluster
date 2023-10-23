import { createBrowserHistory } from "history";
import React, { ReactNode, Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { authenticatedUser } from "../reducers/authSlice";
import Container from "./components/common/Container";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";
import AddFebric from "./components/product/Febric/Add";
import Febric from "components/product/Febric/Febric";
import Thread from "./components/product/Thread/Thread";
import AuthApp from "./components/remotes/AuthApp";
import { menuIds } from "./config/navMenu";
import "./styles/main.scss";
const LazyFebric = lazy(() => import("./components/product/Febric/Febric"));
type Props = {}
const history = createBrowserHistory();
export default function App({ }: Props) {
  const [selectedMenu, setSelectedMenu] = useState<menuIds>("Auth_Signin");
  const [showProfileSideModel, setShowProfileSideModel] = useState<boolean>(false);
  const [showSettingModel, setShowSettingModel] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <>
      <Router history={history}>
        <Switch>
         <Route path="/auth">
            <AuthApp
              actions={{ authenticatedUser }}
              globalDispatch={dispatch}
            />
          </Route>
          <Container
            setShowSettingModel={setShowSettingModel}
            showSettingModel={showSettingModel}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu} >
            <Route exact path="/dashboard">
              <Dashboard
                setShowSettingModel={setShowSettingModel}
                showSettingModel={showSettingModel}
                setShowProfileSideModel={setShowProfileSideModel}
                showProfileSideModel={showProfileSideModel} />
            </Route>
            <Route exact path="/products/febric">
              <Suspense fallback={<div>Please wait....</div>}>
                <LazyFebric />
              </Suspense>
              
            </Route>
            <Route exact path="/products/thread">
              <Thread />
            </Route>
            <Route exact path="/products/febric/add">
              <AddFebric />
            </Route>
          </Container>
        </Switch>
      </Router>
    </>
  )
}