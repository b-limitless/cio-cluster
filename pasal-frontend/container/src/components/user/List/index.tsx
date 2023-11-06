import React, { Fragment, useEffect, useState } from 'react'
import { Button, BasicTable } from "@pasal/cio-component-library"
import styles from "@pasal/common-style/styles/components/_table.module.scss";
import tableStyle from "./list.module.scss";
import avatar from "../../../assets/img/avatar.png";
import { assetsCDN } from '../../../config/assetsCDN';
import { DataTable } from '@pasal/cio-component-library';
import { mockUsers } from '../../../mock/users';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { APIS } from '../../../config/apis';
import { request } from '@pasal/cio-component-library';
import { affectedRowAction, fetchUsers, fetchedError, fetchingUsers, updateUser, addUser, addedUserAction } from '../../../../reducers/userSlice';
import { userType } from '../../../../reducers/userSlice';
import { useHistory } from 'react-router-dom';
import ConfirmationDialog from '../../common/Confimation/ConfirmationDialog';
type Props = {}

let tableData: any = [
  {
    name: <div className={tableStyle.row}>
      <div className={tableStyle.col}>
        <div className={tableStyle.avatar}>
          <img src={avatar} alt="" />
        </div>
      </div>
      <div className={tableStyle.col}>
        <div className={styles.username}>John Doe</div>
        <div className={tableStyle.email}>test1@gmail.com</div>
      </div>
    </div>,

    profileLink: "http://",
    role: "Super Admin",
    phoneNumber: "+971565973854",
    status: <span className={tableStyle.badge + ' ' + tableStyle.active}>
      <span>Active</span>

    </span>,
    action: <img src={assetsCDN.edit} />
  },
  {
    name: <div className={tableStyle.row}>
      <div className={tableStyle.col}>
        <div className={tableStyle.avatar}>
          <img src={avatar} alt="" />
        </div>
      </div>
      <div className={tableStyle.col}>
        <div className={styles.username}>John Doe</div>
        <div className={tableStyle.email}>test1@gmail.com</div>
      </div>
    </div>,

    profileLink: "http://",
    role: "Super Admin",
    phoneNumber: "+971565973854",
    status: <span className={tableStyle.badge + ' ' + tableStyle.in__active}>
      <span>Active</span>

    </span>,
    action: <img src={assetsCDN.edit} />
  },

]

const filterData: any = [];



export default function List({ }: Props) {
  const [showFebricDetailsModel, setShowFebricDetailsModel] = useState<number>(-1);
  const [showModel, setShowModel] = useState<number>(-1);
  const [deleteUser, setDeleteUser] = useState<null | string>(null);
  const [deletingUser, setDeletingUser] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const filters: string[] = [];

  const { users: { loading, users, error, addedUser } } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const tableHeader = ['firstName', 'lastName', 'role', 'email', 'action'];
  const history = useHistory();

  const handleChange = () => {

  }

  const editUser = (id: string) => {
    dispatch(updateUser(id));
    // send user to add user field
    history.push('/users/add')
  }

  const deleteUserHandler = (id:string) => {
   
    setDeleteUser(id);
  }

  const deleteCancelHandler = () => {
    setDeleteUser(null);
    
  }

  const deleteConfirmedHandler = async() => {
    setDeletingUser(true);
    
    try {
       await request({
        url: `/api/users/team/v1/${deleteUser}`,
        method: 'delete'
      });

      dispatch(fetchUsers(users.filter((user) => user.id !== deleteUser)));

    } catch (err) {
      throw new Error(`Could not delete the user ${err}`);
    }
    setDeletingUser(false);
    setDeleteUser(null);
  }

  useEffect(() => {
    const fetchUsersAPI = async () => {
      dispatch(fetchingUsers(true));
      try {
        let { users, affectedRows } = await request({
          url: APIS.user.users,
          method: 'get'
        });
        users.map((user: userType, i: number) => {
          user.action = <Fragment key={i}><span onClick={() => editUser(user.id)}>Edit</span>{' '}<span onClick = {() => deleteUserHandler(user.id)}>Delete</span></Fragment>
        });
        dispatch(affectedRowAction(affectedRows));
        dispatch(fetchUsers(users));
      } catch (err: any) {
        dispatch(fetchedError(err.response.data));
        console.error(err);
      }
      dispatch(fetchingUsers(false));
    }
    fetchUsersAPI();
  }, []);


  useEffect(() => {
    if (addedUser) {
      const addUserAction:any = { ...addedUser, action: 
         <Fragment>
          <span onClick={() => editUser(addedUser.id)}>Edit</span>{' '}
         <span onClick={() => setDeleteUser(addUserAction.id)}>Delete</span>
         </Fragment> };
      dispatch(addUser(addUserAction));
      dispatch(addedUserAction(null));
    }
  }, [addedUser]);

  return (
    <>

    {/* <FebricDetails setShowFebricDetailsModel={setShowFebricDetailsModel} showFebricDetailsModel={showFebricDetailsModel} /> */}
    {deleteUser && <ConfirmationDialog

>
  <Button variant='light' text='Cancel' onClick={deleteCancelHandler} />
  <Button variant='primary' text={deletingUser ? 'Please wait...' : 'Confirm'} className={styles.dark__primary} size="small" onClick={deletingUser ? null : deleteConfirmedHandler}/>

</ConfirmationDialog>}
    
      <div className={styles.table}>
        <DataTable
          setShowModel={setShowModel}
          tableHeader={tableHeader}
          // @ts-ignore
          tableData={users}
          // showFebricModels={showModel}
          detailsComponents={null}
          showDetailReactNode={<span>Hello</span>}
          tableTitle={'Users'}
          showToLeftButton={{ url: '/users/add', label: 'Add' }}
          setShowSelectRowId={undefined}
          filterData={filterData}
          filters={filters}
          // setFilters={setFilters}
          paginate={true}
          page={page}
          setPage={setPage}
          count={2} //Math.ceil(affectedRows/perPage)}
          loading={loading}
          rightButton={<Link to={'/users/add'}><Button variant='primary' text={'Add'} /></Link>}
          handleFiltersOnChange={handleChange}
        />
      </div>

    </>


  )
}