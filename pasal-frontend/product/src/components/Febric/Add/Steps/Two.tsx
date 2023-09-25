import React from 'react'
import { Button, Input, Select, Chip as MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
import { commonFebricStepType } from '../../types/febrics';

import { brightness, febricSeasons, febricTypes, superShiny, threadTypes } from '../../../../config/febric';


export default function StepTwo({onChangeHandler, febric, errors }: commonFebricStepType) {

    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <Input
                    label="Weight(mg^2)"
                    id="weight"
                    value={febric.weight ?? ""}
                    type="number"
                    name="weight"
                    onChange={onChangeHandler}
                     error={errors.weight ? true : false}
                    helperText={errors.weight ? errors.weight : null}
                />
                <Select options={febricSeasons}
                    value={febric.season ?? ""}
                    label={"Season"}
                    name="season"
                    onChange={onChangeHandler}
                />

                <Select options={febricTypes}
                    value={febric.type ?? ""}
                    label={"Type"}
                    name="type"
                    onChange={onChangeHandler}
                />
            </div>

            <div className={styles.form__row}>
            <Select options={threadTypes}
                    value={febric.threadType ?? ""}
                    label={"Thread Type"}
                    name="threadType"
                    onChange={onChangeHandler}
                />
                <Select options={brightness}
                    value={febric.brightness ?? ""}
                    label={"Bringtness"}
                    name="brightness"
                    onChange={onChangeHandler}
                />

                <Select options={superShiny}
                    value={febric.shperShiny ?? ""}
                    label={"Super Shiny"}
                    name="shperShiny"
                    onChange={onChangeHandler}
                />
            </div>

        </div>
    )
}