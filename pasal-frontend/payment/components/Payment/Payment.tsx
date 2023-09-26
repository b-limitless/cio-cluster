import { DataTable, camelCaseToNormal } from "@pasal/cio-component-library";
import React, { useEffect, useState } from "react";
import paymentMock from "../../mock/payments.json";
import { PaymentStatus } from "../../types/paymentStatus";
import { colorsForPaymentStatus, colorsForTableFields, normalizeDataForVisual } from "../../normalized";
import PaymentSideModel from "../SideModel/index";

type Props = {}


export default function Payment({ }: Props) {
  const filterData = [
    {
      label: "Payment Status",
      data: Object.keys(PaymentStatus).map((item: any) => camelCaseToNormal(item, true)),
      id: "paymentStatus"
    },
  ];
  const count = 8;


  const [showModel, setShowModel] = useState<boolean>(false);
  const [filters, setFilters] = React.useState<any>({ orderStatus: [], paymentStatus: [] });
  const [page, setPage] = useState<number>(1);

  const tableHeader = ["customerId", "paymentMethod", "amount", "paymentDate", "transactionId", "paymentStatus", "action"];

  // normalizeDataForVisual(paymentMock, "orderStatus", colorsForTableFields);
  normalizeDataForVisual(paymentMock, "paymentStatus", colorsForPaymentStatus);


  useEffect(() => {

    // You can implement filter approache in one of many way
    // data structure for the filter would for for this instance is { orderStatus: [], paymentStatus: [] }
    // Just monitor in filters status is changing or not 
    // Check each value it should not be difficult to implement after ward
    // Close this and moving toward another part
  }, [])

  return (
    <>
      <PaymentSideModel
        showModel={showModel}
        setShowModel={setShowModel}
      />
      <div >
        <DataTable
          setShowModel={setShowModel}
          tableHeader={tableHeader}
          tableData={paymentMock.slice(count * page, (count * page) + count)}
          showFebricModels={false}
          detailsComponents={null}
          showDetailReactNode={"Edit"}
          tableTitle={"Payments"}
          showToLeftButton={null}
          setShowSelectRowId={() => { }}
          filterData={filterData}
          filters={filters}
          setFilters={setFilters}
          paginate={true}
          page={page}
          setPage={setPage}
          count={Math.ceil(paymentMock.length / count)}
          loading={false}
        />
      </div>

    </>


  )
}