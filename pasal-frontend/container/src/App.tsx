import { createBrowserHistory } from "history";
import React, { useEffect, useMemo, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Container from "./components/common/Container";
import DashboardApp from "./components/remotes/DashboardApp";
import ProductApp from "./components/remotes/ProductApp";
import UserApp from "./components/remotes/UserApp";
import AuthApp from "./components/remotes/AuthApp";
import OrderApp from "./components/remotes/OrderApp";
import PaymentApp from "./components/remotes/PaymentApp";
import { menuEnum, menuIds } from "./config/navMenu";
import { splitTitleToUrl } from "./pure-functions/splitTitleToUrl";
import "./styles/main.scss";
import { useForkRef } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import authSlice, { verifyResponse, authenticatedUser } from "../reducers/authSlice";
import { Store } from "./store";
import useSetAuthenticatedUser from "../hooks/useSetAuthenticatedUser";
import { Link } from "react-router-dom";
import { request } from "@pasal/cio-component-library";
import { APIS } from "./apis";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";
import AddFebric from "./components/product/Febric/Add";
import Febric from "./components/product/Febric/Febric";
import Thread from "./components/product/Thread/Thread";


type Props = {}

// Use them based on the clicked menu we can load the required component
// Need to track the state which will measure 
const history = createBrowserHistory();

export default function App({ }: Props) {
  const [selectedMenu, setSelectedMenu] = useState<menuIds>("Auth_Signin");
  const [showProfileSideModel, setShowProfileSideModel] = useState<boolean>(false);
  const [showSettingModel, setShowSettingModel] = useState<boolean>(false);


  const dispatch = useDispatch();


  // useSetAuthenticatedUser();

  // useEffect(() => {
  //   if (selectedMenu === menuEnum.Dashboard) {
  //     history.push(splitTitleToUrl(menuEnum.Dashboard));
  //   }

  //   if (selectedMenu === menuEnum.Products_Febric) {
  //     history.push(splitTitleToUrl(menuEnum.Products_Febric));
  //   }

  //   if (selectedMenu === menuEnum.Products_Thread) {
  //     history.push(splitTitleToUrl(menuEnum.Products_Thread));
  //   }

  //   if (selectedMenu === menuEnum.Users) {
  //     history.push(splitTitleToUrl(menuEnum.Users));
  //   }

  //   if (selectedMenu === menuEnum.Orders) {
  //     history.push(splitTitleToUrl(menuEnum.Orders));
  //   }

  //   if (selectedMenu === menuEnum.Payments) {
  //     history.push(splitTitleToUrl(menuEnum.Payments));
  //   }

  // }, [selectedMenu]);


  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/dashboard">
            <Container
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              setShowProfileSideModel={setShowProfileSideModel}
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
              actions={{ authenticatedUser }}
            // globalDispatch={dispatch}

            >

              <Dashboard
                setShowSettingModel={setShowSettingModel}
                showSettingModel={showSettingModel}
                setShowProfileSideModel={setShowProfileSideModel}
                showProfileSideModel={showProfileSideModel} />

            </Container>


          </Route>

          <Route path="/auth">
            <AuthApp
              actions={{ authenticatedUser }}
              globalDispatch={dispatch}
            />
          </Route>

          {/* <Route path="/users">
            <Container
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}>
              <UserApp />
            </Container>

          </Route> */}
          {/* <Route path="/payments">
            <Container
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel} >
              <PaymentApp  />
            </Container>

          </Route> */}

          <Route path="/products/febric">
            <Container
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} >
              <Febric/>
            </Container>

            <ProductApp />
          </Route>

          <Route path="/products/thread">
            <Container
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} >
              <Thread/>
            </Container>

            
          </Route>

          {/* <Route path="/orders">
            <Container
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} >
              <OrderApp />
            </Container>
          </Route> */}
        </Switch>
      </Router>

    </>

  )
}