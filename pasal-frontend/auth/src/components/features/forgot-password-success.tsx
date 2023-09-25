import React from 'react'

type Props = {}

export default function ForgotPasswordSuccess({ }: Props) {
    return (
        <div className="group-elements">
            <div className="row registration">
                <div className="title">
                Please check your email
                </div>
                <div className="purpose">An email has been sent to your email to reset the password . 
Please check in your inbox or spam</div>
            </div>
        </div>
    )
}