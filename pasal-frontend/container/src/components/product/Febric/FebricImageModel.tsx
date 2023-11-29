import React from 'react';
import { febricType } from '../../../../reducers/productSlice';
import SideModel from '../../dashboard/SideModel';
import { FebricModelType } from './types/febrics';


type febricModel = {febric: febricType | null} & FebricModelType;


export default function FebricImageModel({febric, showFebricImageModel, setShowFebricImageModel}: febricModel) {
    const style = {
        backgroundImage: `url(${febric?.originalImageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', 
        zIndex: 1000000
    }
  return (
    <SideModel style={style} showModel={showFebricImageModel} setShowModel={setShowFebricImageModel}>
        {/* Show Details model */}
    </SideModel>
  )
}
