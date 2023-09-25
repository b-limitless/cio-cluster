import React from "react";
import styles from "./customize.module.scss";
import {svgCDNAssets, pngCDNAssetsURIs} from "@pasal/cio-component-library";


interface ItemIterface {
    setShowFebricDetailsModel: Function;
    selection?:any;
    isFebric: boolean
}

const FebricItem = ({ setShowFebricDetailsModel, selection, isFebric }: ItemIterface) => {
    return (<div className={styles.item}>
        <div className={styles.febric__img}>
            <img src={selection.mediaUrl} alt="" className={styles.media}/>
            
            {isFebric && <>
                <span className={`${styles.char} ${styles.new}`}>
                New
            </span>
            <span className={styles.search__icon} onClick={() => setShowFebricDetailsModel(true)}>
                <img src={svgCDNAssets.search} width={14} height={14} alt="Details"></img>
            </span></> }
           
        </div>
        <div className={styles.name__price}>
            <div className={styles.name__type}>
                <div className={styles.name}>
                    Mayfield
                </div>
                <div className={styles.type}>
                    <span className={styles.type1}>
                        COTTON -
                    </span>
                    <span className={styles.type2}>
                        ESSENTIAL
                    </span>
                </div>
            </div>
            {isFebric && <div className={styles.price}>
                $90
            </div>}
        </div>
    </div>
    
    )
}

export default FebricItem;