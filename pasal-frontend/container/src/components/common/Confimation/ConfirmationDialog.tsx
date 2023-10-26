import React, { ReactNode } from 'react';
import Model from '../Model/Model';
import {Button} from '@pasal/cio-component-library';
import styles from './styles.module.scss';
import ConfirmationTemplate from './Template';

type Props = {
    children: ReactNode
}


export default function ConfirmationDialog({children}: Props) {
    return (
        <Model ref={null}>
            <ConfirmationTemplate 
             title='Confirmation' 
             description='Are you sure to delete this item?' 
             confirmation='navigation' >
                {children}
             </ConfirmationTemplate>
        </Model>
    )
}