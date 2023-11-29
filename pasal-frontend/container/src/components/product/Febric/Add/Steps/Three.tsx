import { Select } from '@pasal/cio-component-library';
import React from 'react';
import { opacity, stretchy, threadCounts, threadStyles, tones, waterProof } from '../../../../../config/febric';
import styles from "../add-febric.module.scss";
import { commonFebricStepType } from '../../types/febrics';
type Props = {}

export default function StepThree({ onChangeHandler, febric, errors }: commonFebricStepType) {
    return (
        <div className={`${styles.row} ${styles.childrens}`}>
            <div className={styles.form__row}>
                <Select options={threadCounts}
                    label={"Thread Count"}
                    value={febric.threadCounts ?? ""}
                    name="threadCounts"
                    onChange={onChangeHandler}
                    error={errors.threadCounts ? true : false}
                    helperText={errors.threadCounts ? errors.threadCounts : null}

                />
                <Select options={opacity}
                    label={"Opacity"}
                    value={febric.opacity ?? ""}
                    name="opacity"
                    onChange={onChangeHandler}
                    error={errors.opacity ? true : false}
                    helperText={errors.opacity ? errors.opacity : null}
                />

                <Select options={waterProof}
                    label={"Water Proof"}
                    value={febric.waterproof ?? ""}
                    name="waterproof"
                    onChange={onChangeHandler}
                    error={errors.waterproof ? true : false}
                    helperText={errors.v ? errors.waterproof : null}
                />

            </div>

            <div className={styles.form__row}>
                <Select options={threadStyles}
                    label={"Thread Style"}
                    value={febric.threadStyle ?? ""}
                    name="threadStyle"
                    onChange={onChangeHandler}
                    error={errors.threadStyle ? true : false}
                    helperText={errors.threadStyle ? errors.threadStyle : null}

                />

            <Select options={tones}
                    label={"Tone"}
                    value={febric.tone ?? ""}
                    name="tone"
                    onChange={onChangeHandler}
                    error={errors.tone ? true : false}
                    helperText={errors.tone ? errors.tone : null}

                />

<Select options={stretchy}
                    label={"stretchy"}
                    value={febric.stretchy ?? ""}
                    name="stretchy"
                    onChange={onChangeHandler}
                    error={errors.stretchy ? true : false}
                    helperText={errors.stretchy ? errors.stretchy : null}

                />
            </div>

        </div>
    )
}