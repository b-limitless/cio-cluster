import React, { useState } from 'react'
import { Button, Input, Select, Chip as MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
import { febricTypes } from '../../../../config/febric';
import { SelectChangeEvent } from '@mui/material/Select';
import { svgCDNAssets } from '../../../../config/assets';
type Props = {}

interface CompositionInterface {
    name: string;
    code: string;
    persantage?: number;
}

export default function StepSix({ }: Props) {
    const [compositions, setComposition] = useState<CompositionInterface[]>([]);
    const [availableComposition, setAvailableComposition] = useState<CompositionInterface[]>(febricTypes)


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
        const { name, value } = e.target;
        console.log(`${i} is changing with value ${value}`);

        if (value < 0 || value > 100) {
            return;
        }

        // Lets updat the exactly index of compositions
        const copyComposition = Object.assign(compositions[i]);
        copyComposition.persantage = value;


        setComposition([...compositions, ...copyComposition]);
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

    const nextStepHandler = () => {
        // Sum all selected combination 
        const sumCombinations = compositions.reduce((accomulator, current) => accomulator + (current?.persantage ?? 0), 0);
        // Febric must have made with some combinations
        if(sumCombinations < 100) {
            throw new Error("Sum of all combination should be 100");
        }

    }


    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <Select options={availableComposition}
                    value={""}
                    label={"Select composition"}
                    onChange={compositionOnChangeHandler}
                />

            </div>

            <div className={styles.form__row}>
                <div className={styles.compositions}>
                    {compositions.map((composition, i) => <div key={`composition-${i}`}className={styles.item}>
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

                            //  error={true}
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