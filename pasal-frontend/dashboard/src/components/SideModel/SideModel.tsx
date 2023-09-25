
import React from 'react';
import styles from "./model.module.scss";
import CloseSVG from '../../assets/svg/close.svg';


interface SideModeInterface {
  children: React.ReactNode;
  showModel: boolean;
  setShowModel: Function;

}



export default function SideModel({ children, showModel, setShowModel }: SideModeInterface) {
  return (
    <div className={`${styles.model} ${showModel ? styles.show : styles.hide}`}>
      <div className={styles.model__side}>
        <div className={styles.close}>
          <CloseSVG onClick={() => setShowModel(false)}/>
        </div>
        {children}
      </div>
    </div>
  )
}