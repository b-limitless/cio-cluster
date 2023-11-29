import React from 'react'
import { Button, Input, Select, Chip as MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
import { commonFebricStepType } from '../../types/febrics';

import { brightness, febricSeasons, febricTypes, superShiny, threadTypes } from '../../../../../config/febric';


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
                    value={febric.febricSeasons ?? ""}
                    label={"Season"}
                    name="febricSeasons"
                    onChange={onChangeHandler}
                    error={errors.febricSeasons ? true : false}
                    helperText={errors.febricSeasons ? errors.febricSeasons : null}
                />

                <Select options={febricTypes}
                    value={febric.febricTypes ?? ""}
                    label={"Febric Types"}
                    name="febricTypes"
                    onChange={onChangeHandler}
                    error={errors.febricTypes ? true : false}
                    helperText={errors.febricTypes ? errors.febricTypes : null}
                />
            </div>

            <div className={styles.form__row}>
            <Select options={threadTypes}
                    value={febric.threadTypes ?? ""}
                    label={"Thread Type"}
                    name="threadTypes"
                    onChange={onChangeHandler}
                    error={errors.threadTypes ? true : false}
                    helperText={errors.threadTypes ? errors.threadTypes : null}
                />
                <Select options={brightness}
                    value={febric.brightness ?? ""}
                    label={"Bringtness"}
                    name="brightness"
                    onChange={onChangeHandler}
                    error={errors.brightness ? true : false}
                    helperText={errors.brightness ? errors.brightness : null}
                />

                <Select options={superShiny}
                    value={febric.superShiny ?? ""}
                    label={"Super Shiny"}
                    name="superShiny"
                    onChange={onChangeHandler}
                    error={errors.superShiny ? true : false}
                    helperText={errors.superShiny ? errors.superShiny : null}
                />
            </div>

        </div>
    )
}