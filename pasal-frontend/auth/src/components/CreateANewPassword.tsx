import React from "react";
import Template from "../common/Template";
import { Select, Button, Input, Checkbox, InputWithIcon, InputAdornments } from "@pasal/cio-component-library"
import BackLeftIcon from "../assets/svg/back-left-icon.svg";

export default function CreateANewPassword() {
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
                            Create a new password
                        </div>
                        <div className="purpose">
                            <ul>
                                <li>We recommend to use  At least 12 characters long (the longer, the better).</li>
                                <li>Has a combination of upper and lowercase letters, numbers, punctuation and special symbols.</li>
                                <li>Random and unique.</li>
                            </ul>
                        </div>

                        <div className="form">

                            <InputAdornments
                                label="Password"
                            />
                            <InputAdornments
                                label="Confirm Password"
                            />
                            <Button variant="primary" text="Reset"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </Template>

    );
}
