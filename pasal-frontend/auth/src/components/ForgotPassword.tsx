import React from "react";
import Template from "../common/Template";
import { Select, Button, Input, Checkbox, InputWithIcon, InputAdornments } from "@pasal/cio-component-library"
import BackLeftIcon from "../assets/svg/back-left-icon.svg";
import ForgotPasswordFeature from "./features/forgot-password.feature";
import ForgotPasswordSuccess from "./features/forgot-password-success";

export default function ForgotPassword() {
  return (
    <Template>
      <div className="right col">
        <div className="group-nav">
          <div className="row navigate">

            <span className="ico-back">
              <span className="icon">
                <BackLeftIcon />
              </span>
              <div className="back">Back</div>
            </span>
            <span className="steps-info">
              <span className="step">STEP 01/03</span>
              <span className="info">Personal Info.</span>
            </span>
          </div>

        </div>
        {/* <ForgotPasswordFeature/> */}
        <ForgotPasswordSuccess/>
        
      </div>
    </Template>

  );
}
