import React from 'react'
import { Input, Select, Chip as MultipleSelectChip, TextArea, InputAdornments } from '@pasal/cio-component-library';
import styles from "../../form-steps.module.scss";
import { CommonFormInterfaceStep } from '../../user.common.interface';
import { roles } from '../../../../config/role';
import { BasicSwitch } from '@pasal/cio-component-library';

export default function OneStep({ formData, errors, onChangeHandler }: CommonFormInterfaceStep) {
    return (
        <div className={`${styles.row} ${styles.childrens}`}>
            <div className={styles.form__row}>
                <Input
                    label="Fullname"
                    id="fullname"
                    value={formData.fullname ?? undefined}
                    type="text"
                    name="fullName"
                    error={errors.fullName ? true : false}
                    helperText={errors.fullName ? errors.fullName : false}
                    onChange={onChangeHandler}
                />
                <Input
                    label="Email"
                    id="email"
                    defaultValue=""
                    type="email"
                    name="email"
                    onChange={onChangeHandler}
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email : false}

                // error={true}
                // helperText="Incorrect entry."
                />
            </div>

            <div className={styles.form__row}>

                <InputAdornments
                    label="Password"
                    id="password"
                    value={formData.password ?? ""}
                    type="password"
                    name="password"
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password : false}
                    onChange={onChangeHandler}
                />
                <InputAdornments
                    label="Confirm password"
                    id="confirm-password"
                    value={formData.confirmPassword ?? ""}
                    type="password"
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword ? errors.confirmPassword : false}
                    onChange={onChangeHandler}
                />
            </div>

            <div className={styles.form__row}>
                
                <Select options={roles}
                    value={formData.role ?? 0}
                    label={"Role"}
                    name="role"
                    onChange={onChangeHandler}
                    error={errors.role ? true : false}
                    helpertext={errors.role ? errors.role : undefined}
                />
                <div className="iv">
                    <BasicSwitch label="Enable"/>
                </div>
            </div>
        </div>
    )
}