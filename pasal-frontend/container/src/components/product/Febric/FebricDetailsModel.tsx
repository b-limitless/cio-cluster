import SideModel from '../../dashboard/SideModel';
import React from 'react';
import FebricDetails from './FebricDetails';
import Details from './Details';
import { febricType } from '../../../../reducers/productSlice';
import { FebricModelType } from './types/febrics';



type Props = {
    showModel: number;
    setShowModel: Function;
    
};

type febricModel = Props & {febric: febricType | null} & FebricModelType;


export default function FebricDetailsModel({showModel, setShowModel, febric, showFebricImageModel, setShowFebricImageModel}: febricModel) {
  return (
    <SideModel showModel={showModel} setShowModel={setShowModel}>
        <Details febric={febric}
        showFebricImageModel={showFebricImageModel}
        setShowFebricImageModel={setShowFebricImageModel}
        />
    </SideModel>
  )
}
