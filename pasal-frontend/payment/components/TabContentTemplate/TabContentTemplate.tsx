import React, { ReactNode } from "react";
import styles from "./tab-content.module.scss"; 

type Props = {
    children: ReactNode
}

export default function TabContentTemplate({children}: Props) {
  return (
    <div className={styles.tab__content}>
        {children}
    </div>
  )
}