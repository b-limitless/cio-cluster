import React, {useEffect, useState} from 'react';
import { mockFebrics } from '../../mock-data/febric';
import { Button, BasicTable, DataTable, camelCaseToNormal, svgCDNAssets, CheckboxWithLabel } from "@pasal/cio-component-library"
import { request } from '@pasal/cio-component-library';
import FebricDetails from './FebricDetails';
import { APIS } from '../../config/apis';
import { febricType } from './types/febrics';
import { ProductInterface } from '../../interfaces/febric.interface';
import { Link } from 'react-router-dom';

export enum OrderStatusEnum {
  pending="pending",
  inProgress="inProgress",
  completed="completed",
  canceled="canceled",
  pendingVerification="pendingVerification",
  onHold="onHold"
}

export const OrderTypes = `${OrderStatusEnum}`;

export const OrderStatus = Object.keys(OrderStatusEnum);

// type Props = {}
//{}: Props
// We can show the table list of febric with some most important details 
// When they click to we can show exactly the way we are showing to from side
// Show the product details popup with the image with popup
// Before you start working with edit you need  to work with add febric

// Some basic details which you can show in the table is
// 5 items you need check choose title, category, price , material, season

const filterData = [
  {
    label: "Order Status",
    data:  OrderStatus.map(item => camelCaseToNormal(item, true)),
    id: "orderStatus"
  },
  // {
  //   label: "Payment Status",
  //   data: paymentStatus,
  //   id: "paymentStatus"
  // },
];

interface FebricInterface {
  product: ProductInterface;
  actions: any; 
  globalDispatch: any
}

export default function Febric({product, actions, globalDispatch}: FebricInterface) {
  // Loading the febrics for the  users
  const customStyle = {
    cursor: 'pointer'
  }

  const {febrics, loading} = product;
  
  const tableHeader = ['title', 'type', 'price',  'febricSeasons'];

  

  const [showFebricDetailsModel, setShowFebricDetailsModel] = useState<number>(-1);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [filters, setFilters] = React.useState<any>({ orderStatus: [], paymentStatus: [] });
  const [page, setPage] = useState<number>(1);
 

  const showModelHandler = (i:number) => {
    setShowFebricDetailsModel(i);
  }

  // mockFebrics.map((row:any, i:number) => {
  //   row.action = <><a style={customStyle} onClick={() => showModelHandler(i)}>Details</a>{' '}<a>Edit</a></>;
  //   return row;
  // });

  // Lets fetch the febrics

  useEffect(() => {
    const fetchFebrics = async() => {
      globalDispatch(actions.fetchingFebrics(true));
      try {
        const respones = await request({
          url: APIS.product.new, 
          method: 'get'
        });
        globalDispatch(actions.fetchFebrics(respones));
      } catch(err) {
        console.error('Could not fetch febric', err);
      }
      globalDispatch(actions.fetchingFebrics(false));
    }
    fetchFebrics();
  }, [])
  
  const count = 8;
  return (
    <>
    {showFebricDetailsModel !== -1 && <FebricDetails setShowFebricDetailsModel = {setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel}/>}
        <DataTable
          setShowModel={setShowFebricDetailsModel}
          tableHeader={tableHeader}
          // tableData={mockFebrics.slice(page * count, count + (page * count))}
          tableData={febrics}
          showFebricModels={false}
          detailsComponents={null}
          showDetailReactNode={<img src ={svgCDNAssets.eye}/>}
          tableTitle={"Febric"}
          showToLeftButton={{url: "/products/febric/add", label: "Add Febric"}}
          setShowSelectRowId={undefined}
          filterData={filterData}
          filters={filters} 
          setFilters={setFilters}
          paginate={true}
          page={page}
          setPage={setPage}
          count={count}
          loading={product.loading}
          rightButton={<Link to={'/products/febric/add'}><Button variant='primary' text={'Add'}/></Link>}
        />

        
      
    
    </>
    
  )
}