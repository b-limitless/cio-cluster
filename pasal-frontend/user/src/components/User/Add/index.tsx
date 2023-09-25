// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Button, forStepType, formStepEnum, FormTemplate } from '@pasal/cio-component-library';
import { firstLetterUpperCase, validString, validDigit } from '@pasal/common-functions';
import StepOne from '../Add/Steps/One';
import StepTwo from './Steps/Two';
import {emailRegex} from "@pasal/common-functions";
import { authorizations } from '../../../../mock/authorization';

import styles from './add.module.scss';
import StepThree from './Steps/Three';

type Props = {}


const steps = {
    one: [
        {
            name: 'fullName',
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

export default function index({ }: Props) {

    const [step, setStep] = useState<forStepType>(formStepEnum.one);
    const [errors, setErrors] = useState<any>({});
    const [formData, setFormData] = useState<any>({ fullName: "", password: "", confirmPassword: "", role: "", enabled: false });
    const [moveToNextStep, setMoveToNextStep] = useState(false);

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

            if(formData.password !== formData.confirmPassword) {
                catchError.confirmPassword = "both password did not matched";
            }

            setErrors(catchError);
        }
        setMoveToNextStep(true);
    }


    const onChangeHandler = (e: any) => {
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


    return (
        // <div><Button/></div>
        <div className={styles.root}>
            <FormTemplate title= "Add user step"step={step === formStepEnum.two ? "Select Permission" : step} setStep={setStep} nextStepHandler={nextStepHandler} lastStep={step === formStepEnum.three}>
                {step === formStepEnum.one && <StepOne onChangeHandler={onChangeHandler} setFormData={setFormData} formData={formData} errors={errors} setErrors={setErrors} />}
                {step === formStepEnum.two && <StepTwo onChangeHandler={onChangeHandler} setFormData={setFormData} formData={formData} errors={errors} setErrors={setErrors} />}
                {step === formStepEnum.three && <StepThree onChangeHandler={onChangeHandler} setFormData={setFormData} formData={formData} errors={errors} setErrors={setErrors} />}
            </FormTemplate>
        </div>
    )
}