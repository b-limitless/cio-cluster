import { Button } from '@pasal/cio-component-library';
import React, { ReactNode } from "react";
import { forStepType } from "../../../types&Enums/febric";
import styles from "./add-febric.module.scss";

type Props = {
    children: ReactNode
    setStep: Function;
    step: forStepType;
    nextStepHandler: Function;
    lastStep: boolean
}

export default function FormTemplate({ children, step, nextStepHandler, lastStep }: Props) {

    return (
        <div className={styles.addfebric__container}>
            <div className={styles.form__container}>
                <div className={styles.row}>
                    <div className={styles.title}>Proudct - Febric - Add {step}</div>
                </div>
                <div className={styles.form__section}>
                    {children}
                    <div className={`${styles.row} ${styles.button__row}`}>
                        <div className={styles.actions}>
                            {!lastStep && <Button variant="primary" text="Nexddt" onClick={() => nextStepHandler(step)} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}