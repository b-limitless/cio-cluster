import React from 'react';
import { CommonFormInterfaceStep } from '../../user.common.interface';
import { BasicAccordion, BasicSwitch } from '@pasal/cio-component-library';
import styles from "../permissions.module.scss";
import stylesFrom from "../../form-steps.module.scss";
import { authorizations } from '../../../../../mock/authorization';



export default function StepTwo({ }: CommonFormInterfaceStep) {
    return (
        <div className={styles.permission__container + ' ' + stylesFrom.childrens}>
            {authorizations.map((authorization, i) => <div key={i} className={styles.permission__col}>
                <BasicAccordion title="Customer Care" id={`$crs-${i}`} ariaControls={`$crs-${i}`}>
                    <div className={styles.item}>
                        {authorization.permissions.map((permission, j) => <div key={`${permission}-${j}`} className={styles.col}>
                            <BasicSwitch label={permission.title} />
                        </div>)}
                    </div>
                </BasicAccordion>
            </div>)}
        </div>

    )
}