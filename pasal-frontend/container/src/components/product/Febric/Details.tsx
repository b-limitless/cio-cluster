import React, { useState } from 'react';
import { pngCDNAssetsURIs, svgCDNAssets } from '../../../config/assets';
import Star from '../../common/Rating';
import styles from './details.module.scss';
import { febricType } from '../../../../reducers/productSlice';
import { characters } from '../../../config/febric';
import { removeUnderScore } from '../../../functions/removeUnderScore';
import { FebricModelType } from './types/febrics';

// Exclude the file which do not required to show in the details
// Because they exists in table and some of them already shown
const skipFields = ['version','action', 'id', 'price', 'title', 'userId', 'warmth', 'compositions', 'characters', 'waterproof', 'febricType', 'thumbnailImageUrl', 'originalImageUrl']

type Details = {
    febric: febricType | null
} & FebricModelType

const elementStyles = {
    backgroundImage: `url('${pngCDNAssetsURIs.febric1}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}

type ItemDetail = {
    title: string;
    value: string | number;
    // description: string;
}

export const ItemDetail = ({title, value}: ItemDetail) => {
    return <div className={styles.item}>
        <div className={styles.title__icon}>
            <span className={styles.icon}>
                <img src={svgCDNAssets.primiumIcon} width={20} height={20} alt='Primium' />
            </span>
            <span className={styles.title}>
                {title} : {value}
            </span>
        </div>
        {/* <div className={styles.description}>
            For the highest quality, we have our premium fabrics. Here you will only find the best of the best.
        </div> */}
    </div>;
}

export default function Details({ febric, showFebricImageModel, setShowFebricImageModel }: Details) {

    const [toogleIconChecked, setToggleIconChecked] = useState(false);

    const getComposition = () => {
        return febric?.compositions.map((composition, i) =>
            <span key={`composition-${i}`}
                className={styles.type}>{i !== 0 ? ' -' : ''} {composition.persantage}% {composition.name}
            </span>)
    }

    const getCharacters = () => {
        return febric?.characters.map((character, i) =>
            <span key={`character-${i}`} className={styles.item}>{ removeUnderScore(character)}</span>)
    }

    const getAttributes = () => {
        return febric && Object.keys(febric).map((key:any) => {
            if(skipFields.indexOf(key) == -1) {
                // @ts-ignore
                return <ItemDetail title={key} value={febric[key]}/>
            }

            return null;
        });

    }
    return (
        <div className={styles.details}>

            <div className={styles.d__row}>
                <div className={`${styles.col} ${styles.name__cols}`}>
                    <div className={styles.intro__details}>
                        <div className={styles.name__type}>
                            <span className={styles.name}>{febric?.title}</span>

                            {/* {getComposition()} */}
                        </div>
                        <div className={styles.features}>
                            {getCharacters()}
                        </div>
                    </div>

                    <div className={styles.specification}>
                        {removeUnderScore(febric?.warmth)} - {removeUnderScore(febric?.waterproof)} - {removeUnderScore(febric?.febricTypes)} - {febric?.weight} gr/m2 - Super 50s
                    </div>
                    <div className={styles.specification}>
                        {getComposition()}
                    </div>
                </div>
                {/* <div className={styles.col}>
                                <label htmlFor='toggle--checkbox'>
                                <img className = {styles.toggle__icon}src='/svg/up.svg' width={12} height={18} alt='show' />
                                </label>
                                <input className = {styles.toggle__checkbox}type='checkbox' name='' id='toggle--checkbox' />
                            </div> */}
            </div>

            <input checked={toogleIconChecked}
                className={styles.toggle__checkbox}
                type='checkbox'
                name=''
                id='toggle--checkbox'
                onChange={(e) => setToggleIconChecked(e.target.checked)}
            />
            <label htmlFor='toggle--checkbox' className={styles.toggle__label}>
                <img className={styles.toggle__icon} src={svgCDNAssets.arrowUpIcon} width={12} height={18} alt='show' />
            </label>

            <div className={styles.hidden__details}>
                <div className={styles.d__row}>
                    <div className={styles.attribures}>
                        {getAttributes()}
                        {/* <div className={styles.item}>
                            <div className={styles.title__icon}>
                                <span className={styles.icon}>
                                    <img src={svgCDNAssets.primiumIcon} width={20} height={20} alt='Primium' />
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
                                    <img src={svgCDNAssets.primiumIcon} width={20} height={20} alt='Primium' />
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
                                    <img src={svgCDNAssets.primiumIcon} width={20} height={20} alt='Primium' />
                                </span>
                                <span className={styles.title}>
                                    PrimiuAm (+$40)
                                </span>
                            </div>
                            <div className={styles.description}>
                                For the highest quality, we have our premium fabrics. Here you will only find the best of the best.
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* <div className={styles.features__reviews}>
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
                </div> */}
                <div className={styles.hide__info} onClick={() => setToggleIconChecked(false)}>
                    HIDE INFO
                    
                </div>

                <div className={styles.hide__info} onClick={() => setShowFebricImageModel(true)}>
                   View Febric Image
                </div>

                
            </div>
        </div>


    )
}