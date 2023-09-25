import React from 'react'
import {
    Button,
    Checkbox,
    Input,
    InputAdornments,
} from "@pasal/cio-component-library";
import { FormError, FormInterface } from '../../interfaces/user/inde';

type Props = {
    onChangeHandler: Function;
    form: FormInterface;
    onMouseLeaveEventHandler: Function;
    formError: FormError;
    onSubmitHandler:Function;
    submitting: boolean
}



export default function SignupFeature({submitting, onSubmitHandler, onChangeHandler, form, onMouseLeaveEventHandler, formError }: Props) {
    return (
        <div className="group-elements">
            <div className="row registration">
                <div className="title">Register Individual Account!</div>
                <div className="purpose">
                    For the purpose of industry regulation, your details are required.
                </div>

                <div className="form">
                    <Input
                        label="Full name*"
                        id="full-name"
                        // defaultValue="Hello World"
                        type="text"
                        name='fullName'
                        onChange={onChangeHandler}
                        value={form.fullName}
                        error={formError.fullName}
                        helperText={formError.fullName}
                        onBlur={() => onMouseLeaveEventHandler('fullName', form.fullName)}
                    // 
                    />
                    <Input
                        label="Email address*"
                        id="email-address"
                        
                        type="email"
                        name='email'
                        onChange={onChangeHandler}
                        value={form.email}
                        error={formError.email}
                        helperText={formError.email}
                        onBlur={() => onMouseLeaveEventHandler('email', form.email)}

                    />
                    <InputAdornments label="Password"
                        name='password'
                        onChange={onChangeHandler}
                        value={form.password}
                        error={formError.password}
                        helperText={formError.password}
                        onBlur={() => onMouseLeaveEventHandler('password', form.password)}
                    />

                    <InputAdornments label="Confirm password"
                        name='confirmPassword'
                        onChange={onChangeHandler}
                        value={form.confirmPassword}
                        error={formError.confirmPassword}
                        helperText={formError.confirmPassword}
                        onBlur={() => onMouseLeaveEventHandler('confirmPassword', form.confirmPassword)}
                    />

                    <div className="agreement">
                        <Checkbox id="check-me"
                            checked={form.agreement}
                            name='agreement'
                            onChange={onChangeHandler}
                            error={true}
                            // helperText={formError.agreement}
                        />
                        <label htmlFor="check-me">I agree to terms & conditions</label>
                    </div>

                    <Button 
                     variant="primary" 
                     text={submitting ? "Please wait..." : "Register Account"}
                     onClick={() => !submitting ? onSubmitHandler() : null}
                     
                     ></Button>
                </div>
            </div>
        </div>
    )
}