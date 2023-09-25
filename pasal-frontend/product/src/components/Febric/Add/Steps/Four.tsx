import React from 'react'
import { Button, Input, Select, Chip as MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
import { opacity, threadCounts, waterProof } from '../../../../config/febric';
type Props = {}

const warmthOptions = [{ name: 1, code: 1 }, { name: 2, code: 2 }]

export default function StepFour({ }: Props) {

    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <Select options={threadCounts}
                    value={""}
                    label={"Thread Count"}
                    onChange={() => { }}
                />
                <Select options={opacity}
                    value={""}
                    label={"Opacity"}
                    onChange={() => { }}
                />

                <Select options={waterProof}
                    value={""}
                    label={"Water Proof"}
                    onChange={() => { }}
                />

            </div>

        </div>
    )
}