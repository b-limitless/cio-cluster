import React from "react";
import Template from "../common/Template";
import { Select, Button, Input, Checkbox, InputWithIcon, InputAdornments } from "@pasal/cio-component-library"
import BackLeftIcon from "../assets/svg/back-left-icon.svg";

export default function Signin() {
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
        <div className="group-elements">
          <div className="row registration">

            <div className="title">
              Sigin
            </div>
            <div className="purpose">For the purpose of industry regulation, your details are required.</div>

            <div className="form">
             
              <Input
                label="Email address*"
                id="email-address"
                defaultValue=""
                type="email"
              //  error={true}
              // helperText="Incorrect entry."
              />
              <InputAdornments
                label="Password"
              />
              <Button variant="primary" text="Signin"></Button>
            </div>
          </div>
        </div>
      </div>
    </Template>

  );
}
