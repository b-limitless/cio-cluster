import { BasicSwitch, Input, InputAdornments, Select } from '@pasal/cio-component-library';
import React from 'react';
import { roles } from '../../../../config/role';
import styles from '../../../common/FormTemplate/form-steps.module.scss';
import { CommonFormInterfaceStep } from '../../user.common.interface';

export default function OneStep({ formData, errors, onChangeHandler, onBlur, updateUser }: CommonFormInterfaceStep) {
    console.log("formData", formData)
    return (
        <div className={`${styles.row} ${styles.childrens}`}>
            <div className={styles.form__row}>
                <Input
                    label="First Name"
                    id="firstName"
                    value={formData?.firstName ?? undefined}
                    type="text"
                    name="firstName"
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName ? errors.firstName : false}
                    onChange={onChangeHandler}
                />

<Input
                    label="Last Name"
                    id="lastName"
                    value={formData?.lastName ?? undefined}
                    type="text"
                    name="lastName"
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName ? errors.lastName : false}
                    onChange={onChangeHandler}
                />

                
            </div>

            <div className={styles.form__row}>

                <InputAdornments
                    label="Password"
                    id="password"
                    value={formData?.password ?? ""}
                    type="password"
                    name="password"
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password : false}
                    onChange={onChangeHandler}
                />
                <InputAdornments
                    label="Confirm password"
                    id="confirm-password"
                    value={formData?.confirmPassword ?? ""}
                    type="password"
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword ? errors.confirmPassword : false}
                    onChange={onChangeHandler}
                />
            </div>

            <div className={styles.form__row}>
                
                <Select options={roles}
                    value={formData?.role ?? 0}
                    label={"Role"}
                    name="role"
                    onChange={onChangeHandler}
                    error={errors.role ? true : false}
                    helpertext={errors.role ? errors.role : undefined}
                />

<Input
                    label="Email"
                    id="email"
                    defaultValue={formData?.email}
                    type="email"
                    name="email"
                    onChange={onChangeHandler}
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email : false}
                    onBlur={onBlur}
                    disabled={!!updateUser}

                // error={true}
                // helperText="Incorrect entry."
                />

                
            </div>
            <div className={styles.form__row}>
            <div className="iv">
                    <BasicSwitch 
                     label="Enable"
                    //  checked={formData?.enabled}
                    //  onChange={onChangeHandler}
                    //  name="enabled"
                     />
                </div>
            </div>
            
        </div>
    )
}