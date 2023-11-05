import { forStepType, formStepEnum, request } from '@pasal/cio-component-library';
import { emailRegex, firstLetterUpperCase, validString } from '@pasal/common-functions';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import StepOne from './Steps/One';
import StepTwo from './Steps/Two';

import { APIS } from '../../../config/apis';
import StepThree from './Steps/Three';
import styles from './add.module.scss';
import './style.scss';
import { Authorization, PermissionInterface } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { addUser, fetchUsers, updateUser as updateUserAction } from '../../../../reducers/userSlice';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';




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

const formInitialState = { firstName: '', lastName: '',  password: '', confirmPassword: '', role: '', enabled: false, permissions: [] };

export default function index({ }: Props) {
    const {users: {users, update}} = useSelector((state:RootState) => state); 
    const updateUser = users.filter(user => user.id === update);
    const [step, setStep] = useState<forStepType>(formStepEnum.one);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState<any>(
           updateUser.length > 0 ? updateUser[0] : formInitialState
           );
    const [moveToNextStep, setMoveToNextStep] = useState(false);

    const [{ authorizations, loading, error }, dispatch] = useReducer(permissionsReducer, permissionIntialstate);
    
    const globalDispatch = useDispatch();
    const history = useHistory();
    const isUpdateUserMode = useMemo(() => {
        return updateUser.length > 0;
    }, [updateUser]);


    console.log("APIS.user}/${updateUser[0].id", `${APIS.user}/${updateUser[0]?.id}`)

    const editUser = (id:string) => {
        globalDispatch(updateUserAction(id));
        // send user to add user field
        history.push('/users/add')
    }


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

        // Cheke if updateForm is active
        if(isUpdateUserMode) {
            // Send update reuqest 
        }

        // Submit the form to server
        const { action, ...body} = formData;
        try {
            const createOrUpdateUser = await request({
                url: isUpdateUserMode ? `/api/users/v1/${updateUser[0].id}` : APIS.user.createTeam, 
                method: isUpdateUserMode ? 'patch': 'post',
                body
            }); 

            if(isUpdateUserMode) {
                const index = users.map(user => user.id).findIndex((x) => x === updateUser[0].id); 
                const newValue = [...users];
                newValue[index] = formData; 
                globalDispatch(updateUserAction(null));
                globalDispatch(fetchUsers(newValue));
            }
            
            if(!isUpdateUserMode) {
                const action = <Fragment><span onClick={() => editUser(createOrUpdateUser.id)}>Edit</span>{' '}<span>Delete</span></Fragment>
                globalDispatch(addUser({...formData, action}));
            }
           
            setStep(formStepEnum.three);
        } catch(err:any) {
            console.error(`Could not ${isUpdateUserMode ? 'update ' : 'create '} team ${err.response.data}`);
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
            const updatePermssions = [...permissions, name];
            setFormData({ ...formData, permissions: updatePermssions });
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

    useEffect(() => {
        if (Object.entries(errors).length === 0 && moveToNextStep) {
            const getTheIndexOfStep = Object.keys(formStepEnum).indexOf(step);
            setStep(Object.values(formStepEnum)[getTheIndexOfStep + 1]);
            setMoveToNextStep(false);
        }
    }, [moveToNextStep, step, errors]);

    


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
                    updateUser={updateUser.length > 0}
                />}
                {step === formStepEnum.two && <StepTwo
                    onChangeHandler={handleChange}
                    authorizations={authorizations}
                    permissions={formData.permissions}
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