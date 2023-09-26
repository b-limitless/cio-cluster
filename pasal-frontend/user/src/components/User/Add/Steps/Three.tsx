import React from 'react';
import { Message } from '@pasal/cio-component-library';
import { svgCDNAssets } from '@pasal/common-functions';

type Props = {}

export default function StepThree({ }: Props) {
    return (
        <Message
            title='User added sucessfully'
            buttonText='List User'
            buttonVariant='secondary'
            icon={svgCDNAssets.successCheck}
            redirectLink={'/users'}
        />
    )
}