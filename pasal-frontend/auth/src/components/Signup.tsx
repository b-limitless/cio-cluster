import {
  Button,
  Checkbox,
  Input,
  InputAdornments,
} from '@pasal/cio-component-library'
import React, { useEffect, useReducer } from 'react';
import BackLeftIcon from '../assets/svg/back-left-icon.svg';
import Template from '../common/Template';
import SignupFeature from './features/signup.feature';
import VerifyFeature from './features/verify.feature';
import { FormInterface, FormState } from '../interfaces/user/inde';
import { camelCaseToNormal } from '@pasal/cio-component-library'
import { userModel } from '../model/user';

import { APIS } from '../config/apis';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { onSubmitHandler } from '../../common/onSubmitHandler';

import { request } from '../utils/request';

const initialFormErrorState = {
  fullName: null,
  email: null,
  password: null,
  confirmPassword: null,
  agreement: null,

}
const initialState: FormState = {
  submitting: false,
  form: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false
  },
  formHasError: true,
  formError: {
    ...initialFormErrorState
  },
  submissionError: null,
  formSubmitted: false,
  success: null
}

function authReducer(state: FormState, action: any): FormState {
  switch (action.type) {
    case 'REGISTERING_USER':
      return { ...state, submitting: true };
    case 'USER_REGISTRATION_ERROR':
      return { ...state, submissionError: action.payload };
    case 'USER_REGISTRATION_SUCCESS':
      return { ...initialState, success: true };
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
          ...initialFormErrorState
        }
      }
    }
    case 'FORM_SUBMITTED': {
      return {
        ...state,
        formSubmitted: action.payload
      }
    }
    case 'SUBMITTING': {
      return {
        ...state,
        submitting: action.payload
      }
    }
    default:
      return state;
  }
}



export default function Signup() {
  const history = useHistory();

  const [{ submitting,
    form,
    submissionError,
    success, 
    formError,
    formSubmitted,
    formHasError },
    dispatch] = useReducer(authReducer, initialState);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({ type: 'UPDATE_FORM', payload: { name, value: e.target.type === 'checkbox' ? e.target.checked : value } });
  }

  const onMouseLeaveEventHandler = (name: keyof FormInterface, value: string) => {
    if (!userModel[name].test(value)) {
      dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name, value: `${camelCaseToNormal(name, true)} is required` } })
    } else {
      dispatch({ type: 'FORM_ERROR', payload: { name, value: null, formHasError: false } })
    }
  }


  const onSubmitHandlerLocal = () => {
    onSubmitHandler(form, userModel, dispatch, 'signup')
  }

  // useEffect(() => {
  //   const submitFormToServer = async () => {
  //     try {
  //       const response = await request({
  //         url: APIS.auth.signup,
  //         method: 'post',
  //         body: {...form, role:'admin', permissions: ['all']}
  //       });
    
  //       const { verificationCode, user } = response; 
  //       dispatch({ type: 'USER_REGISTRATION_SUCCESS' });
  //       history.push('/auth/verify');

  //     } catch (err: any) {
  //       const { response: { data: { errors } } } = err;
  //       errors.forEach((error: any, i: number) => {
  //         dispatch({ type: 'FORM_ERROR', payload: { formHasError: true, name: error.field, value: error.message } })
  //         dispatch({ type: 'FORM_SUBMITTED', payload: false });
  //         dispatch({ type: 'SUBMITTING', payload: false });
  //       });
  //       console.log('err', errors);
  //     }


  //   }

  //   if(formSubmitted && !formHasError) {
  //     submitFormToServer();
  //   }
    
  // }, [formHasError, formSubmitted]);

  
  return (
    <Template>
      <div className='right col'>
        <div className='group-nav'>
          <div className='row navigate'>
            <span className='ico-back'>
              <span className='icon'>
                <BackLeftIcon />
              </span>
              <div className='back'>Back</div>
            </span>
            <span className='steps-info'>
              <span className='step'>STEP 01/03</span>
              <span className='info'>Personal Info.</span>
            </span>
          </div>
        </div>
        
        {!success && <SignupFeature
          onChangeHandler={onChangeHandler}
          onMouseLeaveEventHandler={onMouseLeaveEventHandler}
          form={form}
          formError={formError}
          onSubmitHandler={onSubmitHandlerLocal}
          submitting={submitting}
        />}
        
      </div>
    </Template>
  );
}
