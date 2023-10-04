import React, { useEffect, useReducer, useState, useMemo } from "react";
import Template from "../common/Template";
import { Select, Button, Input, Checkbox, InputWithIcon, InputAdornments, camelCaseToNormal } from "@pasal/cio-component-library"
import BackLeftIcon from "../assets/svg/back-left-icon.svg";
import { onChangeHandler } from "../../common/onChangeHandler";
import { SigninForm } from "../interfaces/user/inde";
import { signInModel } from "../model/user";
import { onSubmitHandler } from "../../common/onSubmitHandler";
import { request } from "@pasal/cio-component-library";
import { APIS } from "../config/apis";
import { useHistory } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";


interface SigninProcess {
  form: SigninForm,
  formHasError: boolean,
  formError: SigninForm,
  submissionError: string | null;
  success: boolean;
  submitting: boolean;
  formSubmitted: boolean
}

const formIntialState: SigninForm = {
  email: '',
  password: ''
}

const signinInitialState: SigninProcess = {
  form: { email: '', password: '' },
  formHasError: false,
  formError: {
    email: '',
    password: '', 
    message:''
  },
  submissionError: null,
  success: false,
  submitting: false,
  formSubmitted:false
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
    case 'FORM_SUBMITTED': {
      return {
        ...state,
        formSubmitted: action.payload
      }
    }
    case 'SIGNIN_ERROR':
      return { ...state, submissionError: action.payload };
    default:
      return state;
  }
}


export default function Signin() {

  const history = useHistory();
  const [{form, formError, formHasError, formSubmitted}, dispatch] = useReducer(signInProcessReducer, signinInitialState);

  const onMouseLeaveEventHandler = (name: keyof SigninForm, value: string) => {
    if (!signInModel[name]?.test(value)) {
      dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name, value: `${camelCaseToNormal(name, true)} is required` } })
    } else {
      dispatch({ type: 'FORM_ERROR', payload: { name, value: null, formHasError: false } })
    }
  }

   const onSubmitHandlerLocal = () => {
    onSubmitHandler(form, signInModel, dispatch, 'signin')
   }

   useEffect(() => {
    const submitFormToServer = async () => {
      try {
         await request({
          url: APIS.auth.signin,
          method: 'post',
          body: form
        });
    
        history.push('/dashboard');

      } catch (err: any) {
        const { response: { data: { errors } } } = err;
        errors.forEach((error: any, i: number) => {
          dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name: error.field, value: error.message } })
          dispatch({ type: 'FORM_SUBMITTED', payload: false });
          dispatch({ type: 'SUBMITTING', payload: false });
        });
        console.log('err', errors[0].message);
      }


    }
    if(formSubmitted && !formHasError) {
      submitFormToServer();
    }
   }, [formHasError, formSubmitted]);

   console.log('formError', formError)
  
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
            <FormHelperText style={{color: '#d32f2f', minHeight: '19px'}}>
              {formError.message}
            </FormHelperText>
            <div className="form">

              <Input
                label="Email address*"
                id="email-address"
                name="email"
                value={form.email}
                type="email"
                error={formError.email}
                helperText={formError.email ? formError.email : ''}
                onChange={(e:any) => onChangeHandler(e, dispatch)}
                onBlur={() => onMouseLeaveEventHandler('email', form.email)}
              />
              <InputAdornments
                label="Password"
                id="password"
                name="password"
                value={form.password}
                type="password"
                error={formError.password}
                helperText={formError.password ? formError.password : ''}
                onChange={(e:any) => onChangeHandler(e, dispatch)}
                onBlur={() => onMouseLeaveEventHandler('password', form.password)}
              />
              <Button variant="primary" text="Signin" onClick={() => onSubmitHandlerLocal()}></Button>
            </div>
          </div>
        </div>
      </div>
    </Template>

  );
}
