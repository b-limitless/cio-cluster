import React from 'react';
import { Button } from "@pasal/cio-component-library"
import styles from './message.module.scss';
import { svgCDNAssets } from '../../../config/assets';

interface SucessMessageInterface {
    title: string;
    buttonText: string;
    buttonVariant: any;
    icon:string;
}

//svgCDNAssets.successCheck

export default function SuccessMessage({title, buttonText, buttonVariant, icon }: SucessMessageInterface) {
    return (
        <div className={styles.base}>
            <div className={styles.order__completed}>
                <img src={icon} width={82} height={82} alt={title} />
                <div className={styles.bold__message}>{title}</div>
                {/* <div className={styles.confirmation}> You will be receiving confirmation email</div> */}
                <a href="/product/febric">
                    <Button text={buttonText} variant={buttonVariant}/>
                </a>
            </div>

        </div>
    )
}