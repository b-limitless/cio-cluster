import React, { ReactNode } from 'react';
import Model from '../Model/Model';
import { Button } from '@pasal/cio-component-library';
import styles from './styles.module.scss';

type confirmation = 'confirmation' | 'navigation';

type Props = {
    title: string;
    description: string;
    confirmation: confirmation
}

export default function ConfirmationTemplate({ title, description, confirmation }: Props) {
    return (

        <div className={styles.confirmation}>
            <div className={styles.title}>{title} </div>
            <div className={styles.description}>{description}</div>

            <div className={styles.actions}>
                <Button variant='light' text={confirmation === 'confirmation' ? 'Confirm' : 'Cancel'} size="small" />
                {confirmation === 'navigation' && <Button variant='primary' text='Confirm' className={styles.dark__primary} size="small" />}
            </div>
        </div>

    )
}