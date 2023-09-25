import React from 'react'
import { Button, Input, Select, Chip as  MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
import { opacity, threadCounts, waterProof } from '../../../../config/febric';
import { svgCDNAssets } from '../../../../config/assets';
type Props = {}

const warmthOptions = [{ name: 1, code: 1 }, { name: 2, code: 2 }]

export default function StepFive({ }: Props) {

    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <span className={styles.febric__media}>
                    <input type="file" id="febric-images" hidden />
                    <label htmlFor="febric-images" className={styles.febric__image}>
                        <span>
                            <img src={svgCDNAssets.plusDark} />
                        </span>
                        <span>Add Image</span>
                    </label>
                </span>


                <Input
                    label="Image URL"
                    id="imageURL"
                    defaultValue=""
                    type="text"
                //  error={true}
                // helperText="Incorrect entry."
                />

            </div>

        </div>
    )
}