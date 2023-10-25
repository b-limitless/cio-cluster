import React from 'react';
import { febricType } from '../../../../reducers/productSlice';
import SideModel from '../../dashboard/SideModel';
import { FebricModelType } from './types/febrics';


type febricModel = {febric: febricType | null} & FebricModelType;


export default function FebricImageModel({febric, showFebricImageModel, setShowFebricImageModel}: febricModel) {
  return (
    <SideModel showModel={showFebricImageModel} setShowModel={setShowFebricImageModel}>
        {/* Show Details model */}
        Show Image in background
    </SideModel>
  )
}
