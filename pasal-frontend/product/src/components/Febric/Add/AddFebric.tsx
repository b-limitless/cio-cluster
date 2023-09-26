import React, { useEffect, useState } from "react";
import { formStepEnum, forStepType } from "../../../types&Enums/febric";
import {firstLetterUpperCase} from "@pasal/common-functions";
import FormTemplate from "./FormTemplate";
import StepFive from "./Steps/Five";
import StepFour from "./Steps/Four";
import StepOne from "./Steps/One";
import StepSeven from "./Steps/Seven";
import StepSix from "./Steps/Six";
import StepThree from "./Steps/Three";
import StepTwo from "./Steps/Two";
import StepEight from "./Steps/Eight";
import { validDigit, validString } from "../../../config/regrex";
import SuccessMessage from "../../common/success/SuccessMessage";
import { svgCDNAssets } from "../../../config/assets";
import { Message } from '@pasal/cio-component-library';


type Props = {}

const steps = {
    one: [
        {
            name: 'title',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'price',
            regrex: validDigit,
            errorMessage: '',
            type: 'number'
        },
        {
            name: 'deliveryTime',
            regrex: validDigit,
            errorMessage: '',
            type: 'number'
        },
        {
            name: 'excellence',
            regrex:  validDigit,
            errorMessage: '',
            type: 'number'
        },
        {
            name: 'warmth',
            regrex:  validString,
            errorMessage:  "",
            type: 'select'
        }
    ], 
    two: [
        {
            name: 'weight',
            regrex: '',
            errorMessage: '',
            type: 'number '
        },
        {
            name: 'season',
            regrex: '',
            errorMessage: '',
            type: 'text '
        }, 
        {
            name: 'type',
            regrex: '',
            errorMessage: '',
            type: 'text '
        }, 
        {
            name: 'threadType',
            regrex: '',
            errorMessage: '',
            type: 'text '
        }, 
        {
            name: 'brightness',
            regrex: '',
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'superShiny',
            regrex: '',
            errorMessage: '',
            type: 'text '
        }
    ]
}

export default function AddFebric({ }: Props) {
    const [step, setStep] = useState<forStepType>(formStepEnum.one);
    const [errors, setErrors] = useState<any>({});
    const [febric, setFebric] = useState<any>({title: "", warmth:""});
    const [moveToNextStep, setMoveToNextStep] = useState(false);
    
    const nextStepHandler = (step: formStepEnum) => {
        setErrors({});
        if (step === formStepEnum.one) {
            const validation = steps[formStepEnum.one];
            const catchError:any = {};
            validation.map((field, i) => {
                if(!field.regrex.test(febric[field.name])) {
                    const {name} = field;
                    catchError[name] = ` ${firstLetterUpperCase(name)} is required `;
                }
            });
            setErrors(catchError);
        }
        setMoveToNextStep(true);
    }

    
    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setFebric({ ...febric, [name]: value });
    }

    useEffect(() => {
        if (Object.entries(errors).length === 0 && moveToNextStep) {
            const getTheIndexOfStep = Object.keys(formStepEnum).indexOf(step);
            setStep(Object.values(formStepEnum)[getTheIndexOfStep + 1]);
            setMoveToNextStep(false);
        }
    }, [moveToNextStep, step, errors]);

    
    return (
        <FormTemplate step={step} setStep={setStep} nextStepHandler={nextStepHandler} lastStep={step === formStepEnum.eight}>
            {step === formStepEnum.one && <StepOne onChangeHandler={onChangeHandler} febric={febric} errors={errors} setErrors={setErrors} />}
            {step === formStepEnum.two && <StepTwo onChangeHandler={onChangeHandler} febric={febric} errors={errors} setErrors={setErrors} />}
            {step === formStepEnum.three && <StepThree />}
            {step === formStepEnum.four && <StepFour />}
            {step === formStepEnum.five && <StepFive />}
            {step === formStepEnum.six && <StepSix />}
            {step === formStepEnum.seven && <StepSeven />}
            {step === formStepEnum.eight && <Message title ={"Febric added sucessfully"} buttonText = {"List Febric"} buttonVariant={"primary"} icon={svgCDNAssets.successCheck} redirectLink="/products/list"/>}
            
        </FormTemplate>
    )
}