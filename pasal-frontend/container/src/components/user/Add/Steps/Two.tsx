import React from 'react';
import { CommonFormInterfaceStep } from '../../user.common.interface';
import { BasicAccordion, BasicSwitch } from '@pasal/cio-component-library';
import styles from "../permissions.module.scss";
import stylesFrom from "../../form-steps.module.scss";
import { authorizations } from '../../../../mock/authorization';

type Props = {
    onChangeHandler: Function;
}


export default function StepTwo({ onChangeHandler}: CommonFormInterfaceStep) {
    return (
        <div className={styles.permission__container + ' ' + stylesFrom.childrens}>
            {authorizations.map((authorization:any, i:number) => <div key={i} className={styles.permission__col}>
                <BasicAccordion title="Customer Care" id={`$crs-${i}`} ariaControls={`$crs-${i}`}>
                    <div className={styles.item}>
                        {authorization.permissions.map((permission:any, j:number) => <div key={`${permission}-${j}`} className={styles.col}>
                            <BasicSwitch 
                            label={permission.title} 
                            onChange={onChangeHandler}
                            name={permission.title}
                            />
                        </div>)}
                    </div>
                </BasicAccordion>
            </div>)}
        </div>

    )
}