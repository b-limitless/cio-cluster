import { Select } from '@pasal/cio-component-library';
import React from 'react';
import { opacity, threadCounts, waterProof } from '../../../../config/febric';
import styles from "../add-febric.module.scss";
import { commonFebricStepType } from '../../types/febrics';
type Props = {}

export default function StepThree({onChangeHandler, febric, errors }: commonFebricStepType) {
    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <Select options={threadCounts}
                    label={"Thread Count"}
                    value={febric.threadCount ?? ""}
                    name="threadCount"
                    onChange={onChangeHandler}
                    error={errors.threadCount ? true : false}
                    helperText={errors.threadCount ? errors.threadCount : null}

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
                    value={febric.waterProof ?? ""}
                    name="waterProof"
                    onChange={onChangeHandler}
                    error={errors.waterProof ? true : false}
                    helperText={errors.waterProof ? errors.waterProof : null}
                />

            </div>

        </div>
    )
}