import React, {useState} from 'react'
import { Checkbox, CheckboxWithLabel } from '@pasal/cio-component-library';
import styles from "../add-febric.module.scss";
type Props = {}
import { characters } from '../../../../config/febric';

const warmthOptions = [{name: 1, code: 1}, {name: 2, code: 2}]

export default function StepSeven({ }: Props) {

    const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

    const onChangeHanlder = (e:any) => {
        const {name, checked} = e.target;

        if(checked) {
            setSelectedCharacters([...selectedCharacters, name]);
        } else {
            setSelectedCharacters(selectedCharacters.filter(item => item !== name));
        }
    }

    return (
        <div className={`${styles.row} ${styles.childrens}` }>
            <div className={styles.form__row}>
                <div className={styles.characters__label}>
                {characters.map((character, i) => <CheckboxWithLabel checked = {selectedCharacters.indexOf(character.code) !== -1} name={character.code} onChange={onChangeHanlder} key={i} label={character.name}/>)}
                </div>
                
            </div>

            

        </div>
    )
}