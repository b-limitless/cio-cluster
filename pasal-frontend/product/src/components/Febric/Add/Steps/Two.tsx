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
                    value={febric.febricSeasons ?? ""}
                    label={"Season"}
                    name="febricSeasons"
                    onChange={onChangeHandler}
                    error={errors.febricSeasons ? true : false}
                    helperText={errors.febricSeasons ? errors.febricSeasons : null}
                />

                <Select options={febricTypes}
                    value={febric.type ?? ""}
                    label={"Type"}
                    name="type"
                    onChange={onChangeHandler}
                    error={errors.type ? true : false}
                    helperText={errors.type ? errors.type : null}
                />
            </div>

            <div className={styles.form__row}>
            <Select options={threadTypes}
                    value={febric.threadType ?? ""}
                    label={"Thread Type"}
                    name="threadType"
                    onChange={onChangeHandler}
                    error={errors.threadType ? true : false}
                    helperText={errors.threadType ? errors.threadType : null}
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
                    value={febric.shperShiny ?? ""}
                    label={"Super Shiny"}
                    name="shperShiny"
                    onChange={onChangeHandler}
                    error={errors.shperShiny ? true : false}
                    helperText={errors.shperShiny ? errors.shperShiny : null}
                />
            </div>

        </div>
    )
}