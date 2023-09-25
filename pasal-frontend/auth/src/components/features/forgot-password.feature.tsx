import React from 'react'
import {
    Button,
    Checkbox,
    Input,
    InputAdornments,
} from "@pasal/cio-component-library"

type Props = {}

export default function ForgotPasswordFeature({ }: Props) {
    return (
        <div className="group-elements">
            <div className="row registration">

                <div className="title">
                    Forgot Password
                </div>
                <div className="purpose">Please enter email address. We will send to email to reset your passord.</div>

                <div className="form">

                    <Input
                        label="Email address*"
                        id="email-address"
                        defaultValue=""
                        type="email"
                    //  error={true}
                    // helperText="Incorrect entry."
                    />

                    <Button variant="primary" text="Send Instruction"></Button>
                </div>
            </div>
        </div>
    )
}