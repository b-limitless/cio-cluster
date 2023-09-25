import { Select } from '@pasal/cio-component-library';
import React from 'react';
import { opacity, threadCounts, waterProof } from '../../../../config/febric';
import styles from "../add-febric.module.scss";
type Props = {}

export default function StepThree({ }: Props) {
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