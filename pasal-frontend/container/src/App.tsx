import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
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


type Props = {}
// Import all microfrontend here and then simply 
// Use them based on the clicked menu we can load the required component
// Need to track the state which will measure 
const history = createBrowserHistory();

export default function App({ }: Props) {
  const [selectedMenu, setSelectedMenu] = useState<menuIds>("Auth_Signin");
  const [auth, setAuth] = useState<null | { token: string }>(null);
  const [showProfileSideModel, setShowProfileSideModel] = useState<boolean>(false);
  const [showSettingModel, setShowSettingModel] = useState<boolean>(false);


  // useEffect(() => {
  //   if (selectedMenu === menuEnum.Dashboard) {
  //     history.push(splitTitleToUrl(menuEnum.Dashboard));
  //   }

  //   if (selectedMenu === menuEnum.Products_Febric) {
  //     history.push(splitTitleToUrl(menuEnum.Products_Febric));
  //   }
  //   if (selectedMenu === menuEnum.Product_Thread) {
  //     history.push(splitTitleToUrl(menuEnum.Product_Thread));
  //   }
  //   if (selectedMenu === menuEnum.Users) {
  //     history.push(splitTitleToUrl(menuEnum.Users));
  //   }

  //   if (selectedMenu === menuEnum.Orders) {
  //     history.push(splitTitleToUrl(menuEnum.Orders));
  //   }

  //   if(selectedMenu === menuEnum.Payments) {
  //     history.push(splitTitleToUrl(menuEnum.Payments));
  //   }

  // }, [selectedMenu]);

  useEffect(() => {
    if (auth) {
      history.push(splitTitleToUrl(menuEnum.Dashboard));
    }

    // if (!auth) {
    //   history.push(splitTitleToUrl(menuEnum.Auth_Signin));
    // }
  }, [auth]);



 

  return (
    <>
      <Router history={history}>
        <Switch>
          {/* <Route exact path="/dashboard">
            <Container
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              setShowProfileSideModel={setShowProfileSideModel}
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
            >
              <DashboardApp
                setShowSettingModel={setShowSettingModel}
                showSettingModel={showSettingModel}
                onSingIn={() => { }}
                isSignIn={false}
                setShowProfileSideModel={setShowProfileSideModel}
                showProfileSideModel={showProfileSideModel} />

            </Container>
          </Route> */}

          <Route path="/auth">
            <AuthApp onSingIn={() => { }} isSignIn={false} />
          </Route>

          {/* <Route path="/users">
            <Container selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}>
              <UserApp onSingIn={() => { }} isSignIn={false} />
            </Container>

          </Route>
          <Route path="/payments">
            <Container selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel} >
              <PaymentApp onSingIn={() => { }} isSignIn={false} />
            </Container>

          </Route>

          <Route path="/products">
            <Container setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} >
              <ProductApp onSingIn={() => { }} isSignIn={false} />
            </Container>
          </Route>

          <Route path="/orders">
            <Container setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} >
              <OrderApp onSingIn={() => { }} isSignIn={false} />
            </Container>
          </Route> */}
        </Switch>
      </Router>

    </>

  )
}