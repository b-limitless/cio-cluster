import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { formStepEnum, forStepType } from '../../../types&Enums/febric';
import { firstLetterUpperCase } from '@pasal/common-functions';
import FormTemplate from './FormTemplate';
import StepFive from './Steps/Five';
import StepFour from './Steps/Four';
import StepOne from './Steps/One';
import StepSeven from './Steps/Seven';
import StepSix from './Steps/Six';
import StepThree from './Steps/Three';
import StepTwo from './Steps/Two';
import StepEight from './Steps/Eight';
import { validDigit, validString, alphanumericRegex, wordRegrex } from '../../../config/regrex';
import SuccessMessage from '../../common/success/SuccessMessage';
import { svgCDNAssets } from '../../../config/assets';
import { Message } from '@pasal/cio-component-library';
import { ChangeEvent } from 'react';
import { request } from '@pasal/cio-component-library';
import { APIS } from '../../../config/apis';
import axios from 'axios';
import { CompositionInterface } from './Steps/steps.interface';
import { febricTypes } from '../../../config/febric';


type Props = {}

const steps: { [key in forStepType]: any } = {
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
            regrex: validDigit,
            errorMessage: '',
            type: 'number'
        },
        {
            name: 'warmth',
            regrex: validString,
            errorMessage: '',
            type: 'select'
        },

    ],
    two: [
        {
            name: 'weight',
            regrex: validDigit,
            errorMessage: '',
            type: 'number '
        },
        {
            name: 'febricSeasons',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'febricTypes',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'threadType',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'brightness',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'shperShiny',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        }
    ],
    three: [
        {
            name: 'threadCount',
            regrex: wordRegrex,
            errorMessage: '',
            type: 'select '
        },
        {
            name: 'opacity',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
        {
            name: 'waterProof',
            regrex: validString,
            errorMessage: '',
            type: 'text '
        },
    ],
    four: [],
    five: [],
    six: [],
    seven: [],
    eight: []
}

export default function AddFebric({ }: Props) {
    const [step, setStep] = useState<forStepType>(formStepEnum.one);
    const [errors, setErrors] = useState<any>({ compositions: null });
    const [febric, setFebric] = useState<any>({ title: '', warmth: '', characters: [] });
    const [moveToNextStep, setMoveToNextStep] = useState(false);
    const [febricImage, setFebricImage] = useState<File | null>(null);
    const [febricImageError, setFebricImageError] = useState<null | string>(null);
    const [uploadingFebric, setUploadingFebric] = useState<boolean>(false);

    // Will store data for febric composition such as cotton, polyster etc 
    const [compositions, setComposition] = useState<CompositionInterface[]>([]);
    const [availableComposition, setAvailableComposition] = useState<CompositionInterface[]>(febricTypes);
    // const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
    // const [compositionError, setCompositionError] = useState<null | string>(null)



    // Managing state for the media upload 


    const [counter, setCounter] = useState(0);

    const nextStepHandler = (step: formStepEnum) => {
        setErrors({});

        const validation = steps[step];

        const catchError: any = {};
        validation.map((field: any, i: number) => {
            if (!febric[field.name] || !field.regrex.test(febric[field.name])) {
                const { name } = field;
                catchError[name] = ` ${firstLetterUpperCase(name)} is required `;
            } else {
                console.log(`${febric[field.name]} is passed with regrex ${field.regrex}`)
            }
        });
        setErrors(catchError);
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

    const nextStepAfterMediaUpload = async () => {

        // Lets validate that image has been set
        // If image is not full and there is no error
        if (!febricImage) {
            setFebricImageError('Please select a febric image');
        }

        if (!febricImageError && febricImage) {
            // Process the requst
            setFebricImageError(null);
            setUploadingFebric(true)
            // Send the requst to upload the file 
            const formData = new FormData();
            formData.append('image', febricImage);

            try {
                const uploadFebric = await axios.post(APIS.product.upload, formData, {
                    headers: {

                        'Content-Type': 'multipart/form-data',

                    }
                })

                const { originalImageUrl, thumbnailImageUrl } = uploadFebric.data;
                setFebric({ ...febric, originalImageUrl, thumbnailImageUrl });
                setFebricImage(null);
                setStep(formStepEnum.five);
            } catch (err: any) {
                const { errors } = err.response.data;
                setFebricImageError(errors[0].message);
                console.error('Could not upload febric image', err);
            }
            setUploadingFebric(false)

        }

    }

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setFebricImageError(null);
        const file = event.target.files && event.target.files[0];

        const allowedTypes = ['image/jpeg', 'image/png', , 'image/webp']; // Add more allowed types if needed
        const maxFileSizeKB = 1024 * 1024 * 3; // Maximum allowed file size in kilobytes (1MB * 3)

        if (!file) {
            setFebricImageError('Please select a file');
            return;
        }

        if (file.size > maxFileSizeKB) {
            setFebricImageError(`File size exceeds, Only ${maxFileSizeKB / 1024} MB allowed`);
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setFebricImageError(`Invalid image type, only jpeg, png, gif, webp extension is allwoed`);
            return;
        }

        // Validate before setting to state 

        if (file) {
            setFebricImage(file);
        }
    };

    const compositionNextStepHandler = useCallback(() => {
        setErrors({});
        if (compositions.length < 1) {
            setErrors({ ...errors, compositions: "Please select compositions" });
            return;
        }



        const sumCombinations = compositions.reduce((accomulator, current) => accomulator + (current?.persantage ?? 0), 0);
        if (sumCombinations < 100) {
            setErrors({ ...errors, compositions: "Sum of all combination should be 100%" });
            return;
        }

        setFebric({ ...febric, compositions });
        setErrors({});
        setStep(formStepEnum.six);

    }, [compositions, errors]);


    const characterOnChangeHalder = (e: any) => {
        const { name, checked } = e.target;
        if (checked) {
            const { characters } = febric;
            characters.push(name)
            setFebric({ ...febric, characters });
        } else {
            const characters = febric.characters.filter((item: string) => item !== name);
            setFebric({ ...febric, characters });
        }
    }

    const submitFebricToServerHandler  = async() => {
        // Submit the form to server
        try {
            await request({
                url: APIS.product.new, 
                body: febric, 
                method: 'post'
            });
            setStep(formStepEnum.eight);
        } catch(err) {
            console.error('Could not submit the form', err);
        }
        
    }

    console.log("febric", JSON.stringify(febric));

    return (


        <FormTemplate
            step={step}
            setStep={setStep}
            nextStepHandler={step === formStepEnum.four ? nextStepAfterMediaUpload : 
                step === formStepEnum.five ? compositionNextStepHandler : 
                step === formStepEnum.six ? submitFebricToServerHandler: 
                nextStepHandler
            }
            lastStep={step === formStepEnum.eight}
            loading={uploadingFebric}>
            {step === formStepEnum.one && <StepOne onChangeHandler={onChangeHandler} febric={febric} errors={errors} setErrors={setErrors} />}
            {step === formStepEnum.two && <StepTwo onChangeHandler={onChangeHandler} febric={febric} errors={errors} setErrors={setErrors} />}
            {step === formStepEnum.three && <StepThree onChangeHandler={onChangeHandler} febric={febric} errors={errors} setErrors={setErrors} />}
            {step === formStepEnum.four && <StepFive onChangeHandler={handleImageChange} errors={febricImageError} />}
            {step === formStepEnum.five && <StepSix
                compositions={compositions}
                setComposition={setComposition}
                availableComposition={availableComposition}
                setAvailableComposition={setAvailableComposition}
                errors={errors}
            />}
            {step === formStepEnum.six && <StepSeven
                onChangeHandler={characterOnChangeHalder}
                selectedCharacters={febric.characters}
            />}
            {step === formStepEnum.seven && <Message title={'Febric added sucessfully'} buttonText={'List Febric'} buttonVariant={'primary'} icon={svgCDNAssets.successCheck} redirectLink='/products/list' />}
            {/* {step === formStepEnum.eight && <Message title={'Febric added sucessfully'} buttonText={'List Febric'} buttonVariant={'primary'} icon={svgCDNAssets.successCheck} redirectLink='/products/list' />} */}

        </FormTemplate>


    )
}