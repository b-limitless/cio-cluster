import SideModel from '../../dashboard/SideModel';
import React from 'react';
import FebricDetails from './FebricDetails';
import Details from './Details';
import { febricType } from '../../../../reducers/productSlice';



type Props = {
    showModel: number;
    setShowModel: Function;
    
}

type febricModel = Props & {febric: febricType | null};


export default function FebricDetailsModel({showModel, setShowModel, febric}: febricModel) {
  return (
    <SideModel showModel={showModel} setShowModel={setShowModel}>
        <Details febric={febric}/>
    </SideModel>
  )
}
