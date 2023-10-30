import { Input, Select } from '@pasal/cio-component-library';
import React from 'react';
import { excellence, type, warmth } from '../../../../../config/febric';
import { commonFebricStepType } from '../../types/febrics';
import styles from '../add-febric.module.scss';





export default function StepOne({ onChangeHandler, febric, errors, setErrors }: commonFebricStepType) {

    const nextStepHandler = () => {
        setErrors({});
        
        if(febric.title !== "") {
            setErrors({...errors, title: "Title field is required"});
        }
    }

    return (
        <div className={`${styles.row} ${styles.childrens}`}>
            <div className={styles.form__row}>
                <Input
                    label="Title"
                    id="title"
                    value={febric.title ?? ""}
                    type="text"
                    name="title"
                    error={errors.title ? true : false}
                    helperText={errors.title ? errors.title : false} 
                    onChange={onChangeHandler}
                    
                />
                

<Select options={warmth}
                    value={febric.warmth ?? ""}
                    label={"Warmth"}
                    name="warmth"
                    onChange={onChangeHandler}
                    error={errors.warmth ? true : false}
                    helpertext={errors.warmth ? errors.warmth: undefined}
                />

                
            </div>

            <div className={styles.form__row}>
                <Input
                    label="Delivery time(days)"
                    id="delivery-time"
                    value={febric.deliveryTime ?? 0}
                    type="number"
                    name="deliveryTime"
                    onChange={onChangeHandler}
                    error={errors.deliveryTime ? true : false}
                    helperText={errors.deliveryTime ? errors.deliveryTime : false} 
                />
                <Select options={excellence}
                    value={febric.excellence ?? 0}
                    label={"Excellence"}
                    name="excellence"
                    onChange={onChangeHandler}
                    error={errors.excellence ? true : false}
                    helpertext={errors.excellence ? errors.excellence : undefined} 
                    
                />
                
                <Input
                    label="Price"
                    id="price"
                    defaultValue=""
                    type="number"
                    name="price"
                    onChange={onChangeHandler}
                    error={errors.price ? true : false}
                    helperText={errors.price ? errors.price : false} 

                />

                
                <Select options={type}
                    label={"Type"}
                    value={febric.type ?? ""}
                    name="type"
                    onChange={onChangeHandler}
                    error={errors.type ? true : false}
                    helperText={errors.type ? errors.type : null}
            />
            </div>

        </div>
    )
}