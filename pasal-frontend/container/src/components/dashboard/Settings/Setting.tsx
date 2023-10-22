import React, { useState } from 'react';
import { SideModel } from '@pasal/cio-component-library';
import TabSettings from './Tabs/Tabs';
// import OrderTabs from '../Tab';

export interface OrderSideModel {
  showModel: boolean;
  setShowModel: Function;
}

export default function Seetings({ showModel, setShowModel }: OrderSideModel) {

  return (
    <SideModel
      showModel={showModel}
      setShowModel={setShowModel}
    >
    <TabSettings/>
    </SideModel>
  )
}