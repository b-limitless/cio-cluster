import React from "react";

import {
    StylesProvider,
    createGenerateClassName,
} from "@material-ui/core/styles";
import { Router, Route, Switch } from "react-router-dom";


const gererateClassName = createGenerateClassName({
    productionPrefix: "pa",
});
import Dashboard from './components/Dashboard/Dashboard';
import "./styles/main.scss";

interface AppInterface {
    history: any;
    onSignin: Function,
    isSignedIn: boolean,
    setShowSettingModel: Function,
    showSettingModel: boolean,
    [x: string]: any
}

export default function App({ setShowSettingModel, showSettingModel, history, onSignin, isSignedIn, showProfileSideModel, setShowProfileSideModel }: AppInterface) {
    console.log("showSettingModel", showSettingModel)
    return (
        <>
            <StylesProvider generateClassName={gererateClassName}>
                <Router history={history}>
                    <Switch>
                        <Route path="/dashboard">
                            <Dashboard setShowSettingModel={setShowSettingModel}
                                showSettingModel={showSettingModel} showProfileSideModel={showProfileSideModel} setShowProfileSideModel={setShowProfileSideModel} />
                        </Route>
                    </Switch>
                </Router>
            </StylesProvider>
        </>
    )
}