import { RectangelData } from '@pasal/cio-component-library';
import React from 'react';
import { PaymentDetailsInterface } from '../../../Payment/payment.interface';

type Props = {};



export default function BillingAddress({ }: Props) {
    const paymentDetails: PaymentDetailsInterface = {
        billingAddress: {
            "firstName": "John",
            "lastName": "Doe",
            "addressLine1": "123 Main St",
            "addressLine2": "",
            "city": "Anytown",
            "state": "CA",
            "postalCode": "12345",
            "country": "USA"
        },
        shippingAddress: {
            "firstName": "John",
            "lastName": "Doe",
            "addressLine1": "123 Main St",
            "addressLine2": "",
            "city": "Anytown",
            "state": "CA",
            "postalCode": "12345",
            "country": "USA"
        },
    };
    return (
        <RectangelData data={paymentDetails}/>
    )
}