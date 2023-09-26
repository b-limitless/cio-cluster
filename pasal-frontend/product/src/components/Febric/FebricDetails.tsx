import React, { useState } from "react"
import styles from "./febric-details.module.scss";
import Star from "../common/Rating";
import { pngCDNAssetsURIs, svgCDNAssets } from "../../config/assets";



interface FebricDetailsInterface {
    setShowFebricDetailsModel: Function;
    showFebricDetailsModel: boolean | number;
    febriId?:number | string;
}

const elementStyles = {
    backgroundImage:`url("${pngCDNAssetsURIs.febric1}")`, 
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}
export default function FebricDetails({showFebricDetailsModel, setShowFebricDetailsModel, febriId}: FebricDetailsInterface) {
    const [toogleIconChecked, setToggleIconChecked] = useState(false);
    return (
        <div className={`${styles.model__container} ? ${showFebricDetailsModel ? styles.fedInModel : styles.fedInModel}`}>
            <div className={styles.model}>
                <div className={styles.febric__container} style={elementStyles}>
                    <div className={styles.action}>
                        <div className={styles.close} onClick={() => setShowFebricDetailsModel(-1)}>
                            <img src={`${svgCDNAssets.crossIcon}`} alt="" width={18} height={18} />
                        </div>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.d__row}>
                            <div className={`${styles.col} ${styles.name__cols}`}>
                                <div className={styles.intro__details}>
                                    <div className={styles.name__type}>
                                        <span className={styles.name}>Mayfiled</span>
                                        <span className={styles.type}>- 100% Cotton </span>
                                    </div>
                                    <div className={styles.features}>
                                        <span className={styles.item}>ECO</span>
                                        <span className={styles.item}>IRON</span>
                                    </div>
                                </div>

                                <div className={styles.specification}>
                                    Year round - Poplin - Pure White - 110 gr/m2 - Super 50s
                                </div>
                            </div>
                            {/* <div className={styles.col}>
                                <label htmlFor="toggle--checkbox">
                                <img className = {styles.toggle__icon}src="/svg/up.svg" width={12} height={18} alt="show" />
                                </label>
                                <input className = {styles.toggle__checkbox}type="checkbox" name="" id="toggle--checkbox" />
                            </div> */}
                        </div>

                        <input checked={toogleIconChecked}
                            className={styles.toggle__checkbox}
                            type="checkbox"
                            name=""
                            id="toggle--checkbox"
                            onChange={(e) => setToggleIconChecked(e.target.checked)}
                        />
                        <label htmlFor="toggle--checkbox" className={styles.toggle__label}>
                            <img className={styles.toggle__icon} src={svgCDNAssets.arrowUpIcon} width={12} height={18} alt="show" />
                        </label>

                        <div className={styles.hidden__details}>
                            <div className={styles.d__row}>
                                <div className={styles.attribures}>
                                    <div className={styles.item}>
                                        <div className={styles.title__icon}>
                                            <span className={styles.icon}>
                                                <img src={svgCDNAssets.primiumIcon} width={20} height={20} alt="Primium" />
                                            </span>
                                            <span className={styles.title}>
                                                PrimiuAm (+$40)
                                            </span>
                                        </div>
                                        <div className={styles.description}>
                                            For the highest quality, we have our premium fabrics. Here you will only find the best of the best.
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.title__icon}>
                                            <span className={styles.icon}>
                                                <img src={svgCDNAssets.primiumIcon} width={20} height={20} alt="Primium" />
                                            </span>
                                            <span className={styles.title}>
                                                PrimiuAm (+$40)
                                            </span>
                                        </div>
                                        <div className={styles.description}>
                                            For the highest quality, we have our premium fabrics. Here you will only find the best of the best.
                                        </div>
                                    </div>
                                    <div className={styles.item}>
                                        <div className={styles.title__icon}>
                                            <span className={styles.icon}>
                                                <img src={svgCDNAssets.primiumIcon} width={20} height={20} alt="Primium" />
                                            </span>
                                            <span className={styles.title}>
                                                PrimiuAm (+$40)
                                            </span>
                                        </div>
                                        <div className={styles.description}>
                                            For the highest quality, we have our premium fabrics. Here you will only find the best of the best.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.features__reviews}>
                                <div className={styles.row}>
                                    <div className={styles.col}>EXCELLENCE</div>
                                    <div className={styles.col}><Star value={2} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col}>EXCELLENCE</div>
                                    <div className={styles.col}><Star value={2} /></div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col}>EXCELLENCE</div>
                                    <div className={styles.col}><Star value={2} /></div>
                                </div>
                            </div>
                            <div className={styles.hide__info} onClick={() => setToggleIconChecked(false)}>
                                HIDE INFO
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}