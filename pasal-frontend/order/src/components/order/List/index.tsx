import React, { useEffect, useState } from "react";
import { DataTable, camelCaseToNormal, Button } from "@pasal/cio-component-library";
import { OrderStatus } from "../../../../enums&Types/order";
import orderMockData from "../../../../mock/order.json";

import { paymentStatus } from "../../../../enums&Types/paymenStatus";
import OrderSideModel from "../../SideModel";
import styles from "./list.module.scss";

// import { colorsForPaymentStatus, colorsForTableFields, normalizeDataForVisual } from "./normolizeData";
type Props = {}



export default function ListOrder({ }: Props) {
  const filterData = [
    {
      label: "Order Status",
      data:  OrderStatus.map(item => camelCaseToNormal(item, true)),
      id: "orderStatus"
    },
    {
      label: "Payment Status",
      data: paymentStatus,
      id: "paymentStatus"
    },
  ];
  const count = 8;

  const [showModel, setShowModel] = useState<boolean>(false);
  const [filters, setFilters] = React.useState<any>({ orderStatus: [], paymentStatus: [] });
  const [page, setPage] = useState<number>(1);
 
  const tableHeader = ["orderId", "customerId", "orderData", "price", "orderStatus", "paymentStatus", "action"];

  // normalizeDataForVisual(orderMockData, "orderStatus", colorsForTableFields);
  // normalizeDataForVisual(orderMockData, "paymentStatus", colorsForPaymentStatus);

 
  
  return (
    <>
       <OrderSideModel
        showModel={showModel}
        setShowModel={setShowModel}
      /> 
      <div className={styles.dataTableContainer}>
        <DataTable
          setShowModel={setShowModel}
          tableHeader={tableHeader}
          tableData={orderMockData.slice(0, 8)}
          showFebricModels={false}
          detailsComponents={null}
          showDetailReactNode={"Edit"}
          tableTitle={"Order"}
          showToLeftButton={null}
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
      </div>
      {/* <Button text="sdf" variant="primary"/> */}
      {/* <Button text="all" variant="secondary"/>
    */}
    </>


  )
}