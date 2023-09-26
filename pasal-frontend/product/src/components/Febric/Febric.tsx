import React, {useState} from 'react';
import { mockFebrics } from '../../mock-data/febric';
import { Button, BasicTable, DataTable, camelCaseToNormal, svgCDNAssets, CheckboxWithLabel } from "@pasal/cio-component-library"

import FebricDetails from './FebricDetails';

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

export default function Febric() {
  // Loading the febrics for the  users
  const customStyle = {
    cursor: 'pointer'
  }


  
  const tableHeader = ['title', 'type', 'price', 'material', 'season', 'action'];

  

  const [showFebricDetailsModel, setShowFebricDetailsModel] = useState<number>(-1);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [filters, setFilters] = React.useState<any>({ orderStatus: [], paymentStatus: [] });
  const [page, setPage] = useState<number>(1);

  const showModelHandler = (i:number) => {
    setShowFebricDetailsModel(i);
  }

  mockFebrics.map((row:any, i:number) => {
    row.action = <><a style={customStyle} onClick={() => showModelHandler(i)}>Details</a>{' '}<a>Edit</a></>;
    return row;
  });

  
  
  const count = 8;
  return (
    <>
    {showFebricDetailsModel !== -1 && <FebricDetails setShowFebricDetailsModel = {setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel}/>}
   
    {/* <div className={styles.febric__wrapper}>
    <div className={styles.febric__container}>
      <div className={styles.row}>
        <div className={styles.title}>Product Febric - List</div>
        <div className={styles.add__new}>
          <a href="/product/febric/add"><Button variant="primary" text="Add Febric" /></a>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.table__container}>
          <div className={styles.filters}>
            <div>Hack</div>
          </div>
          <div className={styles.table}>
              <BasicTable tableHeader={tableHeader} tableData={tableData} tableRow={tableData[0]} showTableHead/>
          </div>
          <div className={styles.pagination}>
            <div>Pagination</div>
          </div>
        </div>
      </div>
    </div>
    </div> */}



        <DataTable
          setShowModel={setShowFebricDetailsModel}
          tableHeader={tableHeader}
          tableData={mockFebrics.slice(page * count, count + (page * count))}
          showFebricModels={false}
          detailsComponents={null}
          showDetailReactNode={<img src ={svgCDNAssets.eye}/>}
          tableTitle={"Febric"}
          showToLeftButton={{url: "/products/febric/add", label: "Add Febric"}}
          setShowSelectRowId={() => { }}
          filterData={filterData}
          filters={filters} 
          setFilters={setFilters}
          paginate={true}
          page={page}
          setPage={setPage}
          count={count}
          loading={false}
          
        />
      
    
    </>
    
  )
}