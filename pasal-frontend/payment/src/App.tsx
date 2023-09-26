import React, { Suspense, lazy } from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import Payment from "../components/Payment";


interface AppInterface {
  history?: any;
  onSignIn?: Function;
  isSignedIn?: boolean;
}



export default ({ history, onSignIn, isSignedIn }: AppInterface) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payments" element={<Payment/>}></Route>
      </Routes>
    </BrowserRouter>

  );
};
