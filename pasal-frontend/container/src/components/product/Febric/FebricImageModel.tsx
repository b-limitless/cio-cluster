import React from 'react';
import { febricType } from '../../../../reducers/productSlice';
import SideModel from '../../dashboard/SideModel';
import { FebricModelType } from './types/febrics';


type febricModel = {febric: febricType | null} & FebricModelType;


export default function FebricImageModel({febric, showFebricImageModel, setShowFebricImageModel}: febricModel) {
    const style = {
        backgroundImage: `url(https://www.permanentstyle.com/wp-content/uploads/2018/08/Chambray-linen-pyjamas.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }

  return (
    <SideModel style={style} showModel={showFebricImageModel} setShowModel={setShowFebricImageModel}>
        {/* Show Details model */}
    </SideModel>
  )
}
