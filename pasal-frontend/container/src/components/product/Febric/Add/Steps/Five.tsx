import React from 'react'
import { Button, Input, Select, Chip as  MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
import { opacity, threadCounts, waterProof } from '../../../../../config/febric';
import { svgCDNAssets } from '../../../../../config/assets';
import { commonFebricStepType } from '../../types/febrics';
import { ChangeEventHandler } from 'react';
import { FormHelperText } from '@mui/material';
import FormErrorMessage from '../../../../common/FormErrorMessage';


interface ImageUploadInterface {
    onChangeHandler: ChangeEventHandler<HTMLInputElement>
    [x:string]:any;
}

const StepFive: React.FC<ImageUploadInterface> = ({
    onChangeHandler, 
    errors
  }) =>  {

    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <span className={styles.febric__media}>
                    <input 
                       type="file" 
                       id="febric-images" 
                       name="febricImage"
                       hidden 
                       accept="image/*"
                       onChange={onChangeHandler}
                       />
                    <label htmlFor="febric-images" className={styles.febric__image}>
                        <span>
                            <img src={svgCDNAssets.plusDark} />
                        </span>
                        <span>Select Image</span>
                    </label>
                </span>
                


                {/* <Input
                    label="Image URL"
                    id="imageURL"
                    defaultValue=""
                    type="text"
                //  error={true}
                // helperText="Incorrect entry."
                />
                 */}

            </div>

            <div className={styles.form__row}>
            {errors && <FormErrorMessage message={errors}/>}

         
            </div>
        </div>
    )
}

export default StepFive;