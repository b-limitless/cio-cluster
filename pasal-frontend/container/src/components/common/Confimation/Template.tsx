import React, { ReactNode } from 'react';
import Model from '../Model/Model';
import { Button } from '@pasal/cio-component-library';
import styles from './styles.module.scss';

type confirmation = 'confirmation' | 'navigation';

type Props = {
    title: string;
    description: string;
    confirmation: confirmation;
    children: ReactNode
}

export default function ConfirmationTemplate({ title, description, confirmation, children }: Props) {
    return (

        <div className={styles.confirmation}>
            <div className={styles.title}>{title} </div>
            <div className={styles.description}>{description}</div>
            <div className={styles.actions}>
                {children}
            </div>
        </div>

    )
}