import React from 'react';
import FebricItem from './FebricItem';
import styles from "./customize.module.scss";
import { svgCDNAssets, pngCDNAssetsURIs } from "@pasal/cio-component-library";
import {firstLetterUpperCase} from "@pasal/common-functions"


type Props = {}

// Data Structure for this could be
const customize = [{
    title: "febric",
    children: [{
        price: 24,
        name: "Mayfiled",
        type: "Cotton",
        feature: "Essential",
        mediaUrl: pngCDNAssetsURIs.febric1
    }]
}, {
    title: "styled",
    children: [{
        title: "collor",
        mediaUrl: svgCDNAssets.collor
    }, {
        title: "Sleev",
        mediaUrl: svgCDNAssets.cuff
        
    }]
},
{
    title: "Sleev",
    children: [{
        title: "Something",
        mediaUrl: svgCDNAssets.cuff
    }]
},
{
    title: "pocket",
    children: [
        {
            title: "Tucket",
            mediaUrl: svgCDNAssets.cuff
        }
    ]
}]

export default function Customize({ }: Props) {
    return (
        <div className={styles.customize}>
            <div className={styles.row}>
                {customize.map((item, i) => <div key={`customize-${i}`} className={styles.item}>
                    <div className={styles.title}>
                        {firstLetterUpperCase(item.title)}
                    </div>
                    <div className={styles.media}>
                        {item.children.map((selection, j) => <FebricItem isFebric = {item.title === "febric"}selection={selection} key={j} setShowFebricDetailsModel={() => { }} />)}

                    </div>
                </div>)}
                {/* <div className={styles.item}>
                    <div className={styles.title}>
                        Febric
                    </div>
                    <div className={styles.media}>
                        <FebricItem setShowFebricDetailsModel={() => { }} />
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>
                        Style
                    </div>
                    <div className={styles.media}>
                        <FebricItem setShowFebricDetailsModel={() => { }} />
                        <FebricItem setShowFebricDetailsModel={() => { }} />
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.title}>
                        Style
                    </div>
                    <div className={styles.media}>
                        <FebricItem setShowFebricDetailsModel={() => { }} />
                        <FebricItem setShowFebricDetailsModel={() => { }} />
                    </div>

                    <div className={styles.media}>
                        <FebricItem setShowFebricDetailsModel={() => { }} />
                        <FebricItem setShowFebricDetailsModel={() => { }} />
                    </div>
                </div> */}
            </div>
        </div>

    )
}