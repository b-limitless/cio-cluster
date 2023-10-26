import { Button, DataTable, camelCaseToNormal, request, svgCDNAssets } from '@pasal/cio-component-library';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchFebrics, fetchingFebrics, updateFebric } from '../../../../reducers/productSlice';
import { APIS } from '../../../config/apis';
import { ProductInterface } from '../../../interfaces/febric.interface';
import { RootState } from '../../../store';
import ConfirmationDialog from '../../common/Confimation/ConfirmationDialog';
import FebricDetailsModel from './FebricDetailsModel';
import FebricImageModel from './FebricImageModel';
import styles from './styles.module.scss';
import { OrderStatus } from './types/febrics';
import { type } from '../../../config/febric';
import { getObjectToArray } from '../../../config/febric';





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
    label: 'Order Status',
    data: OrderStatus.map(item => camelCaseToNormal(item, true)),
    id: 'orderStatus'
  },
  // {
  //   label: 'Type',
  //   data: ['shirt', 'pant'],
  //   id: 'type'
  // },
];

console.log("OrderStatus.map(item => camelCaseToNormal(item, true)),", OrderStatus.map(item => camelCaseToNormal(item, true)),)

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
  const [showFebricImageModel, setShowFebricImageModel] = useState(false);
  const [deleteFebric, setDeleteFebric] = useState<null | string>(null);
  const [deletingFebric, setDeletingFebric] = useState<boolean>(false);

  const history = useHistory();


  const showModelHandler = (i: number) => {
    setShowModel(i);
  }

  const editFebricHandler = (febric: string) => {
    dispatch(updateFebric(febric));
    // history.push('/products/febric/add');
  }

  const deleteFebricHandler = (id: string) => {
    setDeleteFebric(id);
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
        respones.map((row: any, i: number) => {
          row.action = <>
            <a style={customStyle} onClick={() => showModelHandler(i)}>Details</a>{' '}
            <Link to='/products/febric/add' onClick={() => editFebricHandler(row.id)}>Edit</Link>
            {' '}
            <span className={styles.deleteSpan} onClick={() => deleteFebricHandler(row.id)}>Delete</span>
          </>;
          return row;
        });
        dispatch(fetchFebrics(respones));
      } catch (err) {
        console.error('Could not fetch febric', err);
      }
      dispatch(fetchingFebrics(false));
    }
    fetchFebricsOnComponentMount();
  }, []);

  const deleteCancelHandler = () => {
    setDeleteFebric(null);
  }

  const deleteHandler = async() => {
    setDeletingFebric(true)
    try {
      await request({
        method: 'delete', 
        url: `${APIS.product.new}/${deleteFebric}`
      });
      dispatch(fetchFebrics(febrics.filter((febric) => febric.id !== deleteFebric)));
      setDeleteFebric(null);
    } catch(err:any) {
      console.error(err);
      throw new Error(err);
    }
    setDeletingFebric(false)
  }

  const count = 8;


  return (
    <>
      {/* <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel} /> */}
      {deleteFebric && <ConfirmationDialog

>
  <Button variant='light' text='Cancel' onClick={deleteCancelHandler} />
  <Button variant='primary' text={deletingFebric ? 'Please wait...' : 'Confirm'} className={styles.dark__primary} size="small" onClick={deletingFebric ? null : deleteHandler}/>

</ConfirmationDialog>}
      <FebricImageModel
        febric={showModel !== -1 ? febrics[showModel] : null}
        showFebricImageModel={showFebricImageModel}
        setShowFebricImageModel={setShowFebricImageModel}
      />
      <FebricDetailsModel
        showModel={showModel}
        setShowModel={setShowModel}
        febric={showModel !== -1 ? febrics[showModel] : null}
        setShowFebricImageModel={setShowFebricImageModel}
        showFebricImageModel={showFebricImageModel}
      />
      <DataTable
        setShowModel={setShowModel}
        tableHeader={tableHeader}
        // tableData={mockFebrics.slice(page * count, count + (page * count))}
        tableData={febrics}
        // showFebricModels={showModel}
        detailsComponents={null}
        showDetailReactNode={<img src={svgCDNAssets.eye} />}
        tableTitle={'Febric'}
        showToLeftButton={{ url: '/products/febric/add', label: 'Add Febric' }}
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