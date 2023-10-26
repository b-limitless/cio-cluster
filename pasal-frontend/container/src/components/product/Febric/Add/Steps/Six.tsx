import React, { useState } from 'react'
import { Button, Input, Select, Chip as MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
import { febricTypes } from '../../../../../config/febric';
import { SelectChangeEvent } from '@mui/material/Select';
import { svgCDNAssets } from '../../../../../config/assets';
import { CompositionInterface } from './steps.interface';
import FormErrorMessage from '../../../../common/FormErrorMessage';
type Props = {
    compositions: CompositionInterface[];
    availableComposition: CompositionInterface[];
    setComposition: Function;
    setAvailableComposition: Function;
    errors: any;
}


export default function StepSix({ compositions, setComposition, availableComposition, setAvailableComposition, errors }: Props) {

    const compositionOnChangeHandler = (event: SelectChangeEvent) => {
        const { value } = event.target;
        const compositionIsSelected = compositions.filter((composition) => composition.code === value);

        if (compositionIsSelected.length > 0) {
            return;
        }

        const getComposition: any = availableComposition.filter((composition) => composition.code === value);

        // Its remember old values
        getComposition[0].persantage = 0;

        const updatedAvailableComposition = availableComposition.filter((composition) => composition.code !== value);

        setAvailableComposition(updatedAvailableComposition);
        setComposition([...compositions, ...getComposition]);
    }

    const persantageOnChangeHandler = (e: any, i: number) => {
        const {value } = e.target;
        
        if (value < 0 || value > 100) {
            return;
        }
        const updateCompositions = [...compositions];

        // Lets updat the exactly index of compositions
        const copyComposition = {...updateCompositions[i]};
        copyComposition.persantage = value;
        updateCompositions[i] = copyComposition;


        setComposition(updateCompositions);
    }

    const deleteCompositionHandler = (code: string) => {
        const getRowBeforeRemoved = compositions.filter((composition) => composition.code === code);
        const removeWithCode = compositions.filter((composition) => composition.code !== code);

        const combinedAvailableComposition = [...availableComposition, ...getRowBeforeRemoved].sort(function (a, b) {
            if (a.code < b.code) {
                return -1;
            }
            if (a.code > b.code) {
                return 1;
            }
            return 0;
        });

        setAvailableComposition(combinedAvailableComposition);
        setComposition(removeWithCode)
    }

    return (
        <div className={`${styles.row} ${styles.childrens}`}>
            <div className={styles.form__row}>
                <Select options={availableComposition}
                    value={""}
                    label={"Select composition"}
                    onChange={compositionOnChangeHandler}
                    error={errors.compositions ? true : false}
                    helpertext={errors.compositions ? errors.compositions : undefined} 
                    name="compositions"
                />

            </div>

            <div className={styles.form__row}>
                <div className={styles.compositions}>
                    {compositions.map((composition, i) => <div key={`composition-${i}`} className={styles.item}>
                        <div className={styles.col}>
                            <span className={styles.title}>{composition.name}</span>
                        </div>
                        <div className={styles.psersantage}>
                            <Input
                                label="%"
                                id="composition%"
                                value={compositions[i]?.persantage ?? 0}
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                                onChange={(e: any) => persantageOnChangeHandler(e, i)}
                                // error={true}
                                // helperText="Incorrect entry."
                            />
                        </div>
                        <div className={styles.remove__composition}>
                            <img src={svgCDNAssets.delete} onClick={() => deleteCompositionHandler(composition.code)} />
                        </div>
                    </div>)}

                </div>
                
            </div>
            

        </div>
    )
}