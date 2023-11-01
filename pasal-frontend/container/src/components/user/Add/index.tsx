import { forStepType, formStepEnum, request } from '@pasal/cio-component-library';
import { emailRegex, firstLetterUpperCase, validString } from '@pasal/common-functions';
import React, { useEffect, useReducer, useState } from 'react';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import StepOne from './Steps/One';
import StepTwo from './Steps/Two';

import { APIS } from '../../../config/apis';
import StepThree from './Steps/Three';
import styles from './add.module.scss';
import './style.scss';
import { PermissionInterface } from '../types';



type Props = {}


const steps = {
    one: [
        {
            name: 'firstName',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'lastName',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'email',
            regrex: emailRegex,
            errorMessage: '',
            type: 'text'
        },
        {
            name: 'password',
            regrex: validString,
            errorMessage: '',
            type: 'text'
        },
        {
            name: 'confirmPassword',
            regrex: validString,
            errorMessage: '',
            type: 'text'
        },
        {
            name: 'role',
            regrex: validString,
            errorMessage: '',
            type: 'text'
        }
    ],
    two: []
}

// type row = {[x:string]: any[]};

// type permissionType = row[]

export const permissionIntialstate: PermissionInterface = {
    authorizations: [],
    loading: false,
    error: null
}

function permissionsReducer(state: PermissionInterface, action: any) {
    switch (action.type) {
        case 'FETCH_PERMISSIONS':
            return { ...state, authorizations: action.payload }
        case 'FETCHING_PERMISSIONS':
            return { ...state, loading: action.payload };
        case 'FETCHED_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export default function index({ }: Props) {

    const [step, setStep] = useState<forStepType>(formStepEnum.one);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState<any>({ firstName: '', lastName: '',  password: '', confirmPassword: '', role: '', enabled: false, permissions: [] });
    const [moveToNextStep, setMoveToNextStep] = useState(false);

    const [{ authorizations, loading, error }, dispatch] = useReducer(permissionsReducer, permissionIntialstate);

    const finalStepHandler = async() => {
        setErrors({...errors, permissions: null})
        
        // Set next step to three 
        console.log("submitting form to server");
        // Make sure alt least one permission is set
        const {permissions} = formData;

        if(permissions.length === 0) {
            setErrors({...errors, permissions: 'Please select at least one permission'}); 
            return;
        }

        // Submit the form to server
        try {
            await request({
                url: APIS.user.createTeam, 
                method: 'post',
                body: formData
            }); 
            setStep(formStepEnum.three);
        } catch(err:any) {
            console.error(`Could not create team ${err.response.data}`);
        }
        
    }

    const nextStepHandler = (step: formStepEnum) => {
        setErrors({});
        if (step === formStepEnum.one) {
            const validation = steps[formStepEnum.one];
            const catchError: any = {};
            validation.map((field, i) => {
                if (!field.regrex.test(formData[field.name])) {
                    const { name } = field;
                    catchError[name] = ` ${firstLetterUpperCase(name)} is required `;
                }
            });

            if (formData.password !== formData.confirmPassword) {
                catchError.confirmPassword = 'both password did not matched';
            }

            setErrors(catchError);
        }
        setMoveToNextStep(true);
    }


    const onChangeHandler = (e: any) => {
        // If the event type is checkbox then perform different operation

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    useEffect(() => {
        if (Object.entries(errors).length === 0 && moveToNextStep) {
            const getTheIndexOfStep = Object.keys(formStepEnum).indexOf(step);
            setStep(Object.values(formStepEnum)[getTheIndexOfStep + 1]);
            setMoveToNextStep(false);
        }
    }, [moveToNextStep, step, errors]);

    const onMouseLeaveEventHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // We need to check if this email is already exists
        const { email } = formData;
        setErrors({ ...errors, email: null })
        try {
            await request({
                url: APIS.user.checkEmail,
                method: 'post',
                body: { email }
            });
        } catch (err: any) {
            console.log(err.response.data.errors[0].message);
            setErrors({ ...errors, email: err.response.data.errors[0].message })
        }

    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const { permissions } = formData;

        if (checked) {
            permissions.push(name);
            setFormData({ ...formData, permissions });
            return;
        } else {
            setFormData({ ...formData, permissions: permissions.filter((permission: string) => permission !== name) });
        }
    };

    useEffect(() => {
        const fetchPermissions = async () => {
            dispatch({ type: 'FETCHING_PERMISSIONS', payload: true });
            try {
                const response = await request({
                    url: `/api/users/authorizations`,
                    method: 'get'
                });
                dispatch({ type: 'FETCH_PERMISSIONS', payload: response });

            } catch (err: any) {
                console.error(`Error while fetching authorizations ${err}`)
                dispatch({ type: 'FETCHED_ERROR', payload: err });
            }
            dispatch({ type: 'FETCHING_PERMISSIONS', payload: false });
        }
        fetchPermissions();
    }, [])

    

    return (

        <div className={styles.root}>
            <FormTemplate step={step} setStep={setStep} nextStepHandler={
                 step === formStepEnum.two ? finalStepHandler :
                 nextStepHandler
                 
                 } lastStep={step === formStepEnum.three}>
                {step === formStepEnum.one && <StepOne
                    onChangeHandler={onChangeHandler}
                    setFormData={setFormData}
                    formData={formData}
                    errors={errors}
                    setErrors={setErrors}
                    onBlur={onMouseLeaveEventHandler}
                />}
                {step === formStepEnum.two && <StepTwo
                    onChangeHandler={handleChange}
                    authorizations={authorizations}
                //   setFormData={setFormData} 
                //   formData={formData} 
                  errors={errors} 
                //   setErrors={setErrors} 

                />}
                {step === formStepEnum.three && <StepThree />}
            </FormTemplate>
        </div>
    )
}