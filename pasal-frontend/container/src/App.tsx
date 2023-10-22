import { createBrowserHistory } from "history";
import React, { ReactNode, Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { authenticatedUser } from "../reducers/authSlice";
import Container from "./components/common/Container";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";
import AddFebric from "./components/product/Febric/Add";
import Febric from "./components/product/Febric/Febric";
import Thread from "./components/product/Thread/Thread";
import AuthApp from "./components/remotes/AuthApp";
import ProductApp from "./components/remotes/ProductApp";
import { menuIds } from "./config/navMenu";
import "./styles/main.scss";

// Lazy loading components
const LazyFebric = lazy(() => import("./components/product/Febric/Febric"));


type Props = {}

// Use them based on the clicked menu we can load the required component
// Need to track the state which will measure 

interface TemplateWithContainer {
  children: ReactNode;
  selectedMenu: string;
  setSelectedMenu: Function;
  setShowProfileSideModel: Function;
  setShowSettingModel: Function;
  showSettingModel: boolean;

}

const history = createBrowserHistory();

export default function App({ }: Props) {
  const [selectedMenu, setSelectedMenu] = useState<menuIds>("Auth_Signin");
  const [showProfileSideModel, setShowProfileSideModel] = useState<boolean>(false);
  const [showSettingModel, setShowSettingModel] = useState<boolean>(false);


  const dispatch = useDispatch();


  // useSetAuthenticatedUser()

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

          <Route exact path="/products/febric">
            <Container
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} >
              <Suspense fallback={<div>Please wait....</div>}>

                <LazyFebric />
              </Suspense>
            </Container>

            <ProductApp />
          </Route>

          <Route path="/products/thread">
            <Container
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} >
              <Thread />
            </Container>


          </Route>

          <Route path="/products/febric/add">
            <Container
              setShowSettingModel={setShowSettingModel}
              showSettingModel={showSettingModel}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu} >
              <AddFebric />
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
        </Switch>
      </Router>

    </>

  )
}