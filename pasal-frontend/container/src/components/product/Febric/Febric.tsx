import React, { useEffect, useState } from 'react';
import { Button, BasicTable, DataTable, camelCaseToNormal, svgCDNAssets, CheckboxWithLabel } from "@pasal/cio-component-library"
import { request } from '@pasal/cio-component-library';
import FebricDetails from './FebricDetails';
import { APIS } from '../../../config/apis';
import { febricType } from '../../../../reducers/productSlice';
import { ProductInterface } from '../../../interfaces/febric.interface';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { fetchFebrics, fetchingFebrics, updateFebric } from '../../../../reducers/productSlice';
import { useHistory } from 'react-router-dom';
import FebricDetailsModel from './FebricDetailsModel';
import FebricImageModel from './FebricImageModel';



export enum OrderStatusEnum {
  pending = "pending",
  inProgress = "inProgress",
  completed = "completed",
  canceled = "canceled",
  pendingVerification = "pendingVerification",
  onHold = "onHold"
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
    data: OrderStatus.map(item => camelCaseToNormal(item, true)),
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
//product, actions, globalDispatch
export default function Febric() {
  // Loading the febrics for the  users
  const customStyle = {
    cursor: 'pointer'
  }

  // const {febrics, loading} = product;

  const tableHeader = ['title', 'type', 'price', 'febricSeasons', 'action'];

  const { product: { loading, febrics } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();



  const [showFebricDetailsModel, setShowFebricDetailsModel] = useState<number>(-1);
  const [showModel, setShowModel] = useState<number>(-1);
  const [filters, setFilters] = React.useState<any>({ orderStatus: [], paymentStatus: [] });
  const [page, setPage] = useState<number>(1);
  
  const history = useHistory();


  const showModelHandler = (i: number) => {
    setShowModel(i);
  }

  const editFebricHandler = (febric:string) => {
    dispatch(updateFebric(febric));
    // history.push('/products/febric/add');
  }

  // Lets fetch the febrics

  useEffect(() => {
    const fetchFebricsOnComponentMount = async () => {
      dispatch(fetchingFebrics(true));
      try {
        const respones = await request({
          url: APIS.product.new,
          method: 'get'
        });
        respones.map((row:any, i:number) => {
          row.action = <><a style={customStyle} onClick={() => showModelHandler(i)}>Details</a>{' '}<Link to='/products/febric/add' onClick={() => editFebricHandler(row.id)}>Edit</Link></>;
          return row;
        });
        dispatch(fetchFebrics(respones));
      } catch (err) {
        console.error('Could not fetch febric', err);
      }
      dispatch(fetchingFebrics(false));
    }
    fetchFebricsOnComponentMount();
  }, [])

  const count = 8;

   console.log('showmodle', showModel)
  return (
    <>
     {/* <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel} /> */}
      
      <FebricImageModel
        febric={showModel !== -1 ? febrics[showModel] : null}
        showFebricImageModel={true} 
        setShowFebricImageModel={() => {}}
      />
      <FebricDetailsModel 
      showModel={showModel} 
      setShowModel={setShowModel} 
      febric={showModel !== -1 ? febrics[showModel] : null}
      setShowFebricImageModel={() => {}}
      showFebricImageModel={false}
      />
      <DataTable
        setShowModel={setShowModel}
        tableHeader={tableHeader}
        // tableData={mockFebrics.slice(page * count, count + (page * count))}
        tableData={febrics}
        // showFebricModels={showModel}
        detailsComponents={null}
        showDetailReactNode={<img src={svgCDNAssets.eye} />}
        tableTitle={"Febric"}
        showToLeftButton={{ url: "/products/febric/add", label: "Add Febric" }}
        setShowSelectRowId={undefined}
        filterData={filterData}
        filters={filters}
        setFilters={setFilters}
        paginate={true}
        page={page}
        setPage={setPage}
        count={count}
        loading={loading}
        rightButton={<Link to={'/products/febric/add'}><Button variant='primary' text={'Add'} /></Link>}
      />
    </>

  )
}