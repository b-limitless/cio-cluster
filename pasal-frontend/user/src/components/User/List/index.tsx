import React from 'react'
import { Button, BasicTable } from "@pasal/cio-component-library"
import styles from "@pasal/common-style/styles/components/_table.module.scss";
import tableStyle from "./list.module.scss";
import avatar from "../../../assets/img/avatar.png";
import { assetsCDN } from '../../../config/assetsCDN';
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

const tableHeader = ['name', 'role', 'phoneNumber', 'status', , 'action'];

export default function List({ }: Props) {
  return (

    <div className={styles.febric__wrapper + " " + tableStyle.container__height}>
      <div className={styles.febric__container + ' ' + tableStyle.tabelMaxWitdth}>
        <div className={styles.row}>
          <div className={styles.title}>Users - List</div>
          <div className={styles.add__new}>
            <a href="/users/add"><Button variant="primary" text="Create a user" /></a>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.table__container + ' ' + tableStyle.tabelMaxWitdth}>
            <div className={styles.filters}>
              <div>Filter Will be shown</div>
            </div>
            <div className={styles.table}>
                <BasicTable loading={false} tableHeader={tableHeader} tableData={tableData} tableRow={tableData[0]} showTableHead={false} />
            </div>
            <div className={styles.pagination}>
              <div>Pagination</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}