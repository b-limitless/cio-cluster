import React from 'react';
import styles from './shipping.module.scss';
import { RectangelData, TabContentTemplate, camelCaseToNormal } from '@pasal/cio-component-library';

type Props = {}
// You will have to update your Rectangel Data to handle
// If the key value is not an object then handle in diffeentay


export default function Shipping({ }: Props) {
  const shippingMockData: any = {
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Example City",
      "state": "Example State",
      "postalCode": "12345",
      "country": "Example Country"
    },
    "recipientName": { "fullName": "John Doe" },
    "contactInformation": {
      "phone": "123-456-7890",
      "email": "johndoe@example.com"
    },
    "shippingMethod": { "": "Standard Shipping" },
    "trackingNumber": { "": "ABC123XYZ" },
    "shippingCost": { "": 10.99 },
    "shippingInstructions": { "": "Leave package at the front porch" }
  };
  
  return (
    <div className={styles.container}>
      <TabContentTemplate>
      <RectangelData data={shippingMockData} />
      </TabContentTemplate>
      
    </div>
  )
}