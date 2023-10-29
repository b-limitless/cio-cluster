import React, {useState} from 'react'
import { Button, BasicTable } from "@pasal/cio-component-library"
import styles from "@pasal/common-style/styles/components/_table.module.scss";
import tableStyle from "./list.module.scss";
import avatar from "../../../assets/img/avatar.png";
import { assetsCDN } from '../../../config/assetsCDN';
import { DataTable } from '@pasal/cio-component-library';
import { mockUsers } from '../../../mock/users';
import { Link } from 'react-router-dom';
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

const filterData:any = [];



export default function List({ }: Props) {
  const [showFebricDetailsModel, setShowFebricDetailsModel] = useState<number>(-1);
  const [showModel, setShowModel] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const filters:string[] = [];

  const tableHeader = ['fullName', 'role', 'phoneNumber', 'status','action'];

  const handleChange = () => {

  }

  return (

    
            <div className={styles.table}>
                <DataTable
                  setShowModel={setShowModel}
                  tableHeader={tableHeader}
                  tableData={mockUsers}
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
                  loading={false}
                  rightButton={<Link to={'/users/add'}><Button variant='primary' text={'Add'} /></Link>}
                  handleFiltersOnChange={handleChange}
      />
      </div>
           
  )
}