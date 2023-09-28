import React, { useReducer, useState } from "react";
import Template from "../common/Template";
import { Select, Button, Input, Checkbox, InputWithIcon, InputAdornments } from "@pasal/cio-component-library"
import BackLeftIcon from "../assets/svg/back-left-icon.svg";
import { FormState } from "../interfaces/user/inde";

interface SigninForm {
  email: string | null;
  password: string | null;
}

interface SigninProcess {
  form: SigninForm,
  formHasError: boolean,
  formError: SigninForm,
  submissionError: string | null;
  success: boolean;
  submitting: boolean;
}

const formIntialState: SigninForm = {
  email: '',
  password: ''
}

const signinInitialState: SigninProcess = {
  form: { email: '', password: '' },
  formHasError: false,
  formError: {
    email: null,
    password: null
  },
  submissionError: null,
  success: false,
  submitting: false,
}

function signInProcessReducer(state: SigninProcess, action: any) {
  switch (action.type) {
    case 'UPDATE_FORM': {
      const { name, value } = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value
        }
      }
    }
    case 'FORM_ERROR': {
      const { name, value, formHasError } = action.payload;
      return {
        ...state,
        formHasError,
        formError: {
          ...state.formError,
          [name]: value
        }
      }
    }
    case 'RESET_FORM_ERROR': {
      return {
        ...state,
        formError: {
          ...formIntialState
        }
      }
    }
    case 'SUBMITTING': {
      return {
        ...state,
        submitting: action.payload
      }
    }
    case 'SIGNIN_ERROR':
      return { ...state, submissionError: action.payload };
    default:
      return state;
  }
}


export default function Signin() {


  const [{form}, dispatch] = useReducer(signInProcessReducer, signinInitialState);
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
                error={true}
                helperText="Incorrect entry."
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
