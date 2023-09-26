import React, { useState } from 'react';
import { SideModel } from '@pasal/cio-component-library';
import PaymentTabs from '../Tab';

export interface PaymentSideModelInterface {
  showModel: boolean;
  setShowModel: Function;
}

export default function PaymentSideModel({ showModel, setShowModel }: PaymentSideModelInterface) {

  return (
    <SideModel
      showModel={showModel}
      setShowModel={setShowModel}
    >
      <PaymentTabs/>
    </SideModel>
  )
}