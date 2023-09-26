import React from 'react'
import { Input, InputAdornments, FormContainer } from '@pasal/cio-component-library';
type Props = {}
export default function Google({ }: Props) {
    return (
        <div className="styles google">
            <FormContainer
                buttonVariant="primary"
                buttonText="Save"
            >
                <Input label="Client ID" />
                <InputAdornments label="Client Secret" />
                <Input label="Redirect URI" />
            </FormContainer>
        </div>);
}