import React, {useState} from 'react'
import { Checkbox, CheckboxWithLabel } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";

import { characters } from '../../../../../config/febric';

type Props = {
    onChangeHandler: Function;
    selectedCharacters: string[]
}

export default function StepSeven({onChangeHandler, selectedCharacters }: Props) {
    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <div className={styles.characters__label}>
                {characters.map((character:any, i:number) => <CheckboxWithLabel checked = {selectedCharacters.indexOf(character.code) !== -1} name={character.code} onChange={onChangeHandler} key={i} label={character.name}/>)}
                </div>
                
            </div>

            

        </div>
    )
}