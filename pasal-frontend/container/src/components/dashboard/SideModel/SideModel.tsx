
import React from 'react';
import styles from "./model.module.scss";
import CloseSVG from '../../../assets/svg/close.svg'


interface SideModeInterface {
  children: React.ReactNode;
  showModel: boolean | number;
  setShowModel: Function;
  style?:object;

}


export default function SideModel({ children, showModel, setShowModel, style }: SideModeInterface) {
 
  return (
    <div style={style} className={`${styles.model} ${[-1, false].indexOf(showModel) === -1 ? styles.show : styles.hide}`}>
      <div className={styles.model__side}>
        <div className={styles.close}>
          <CloseSVG onClick={() => setShowModel(-1)}/>
        </div>
        {children}
      </div>
    </div>
  )
}