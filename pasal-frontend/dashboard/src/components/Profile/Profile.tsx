import { useState } from 'react';
import { Button, Input, Select,   MultipleSelect, TextArea, InputAdornments } from '@pasal/cio-component-library';
import React from 'react';
import AvatarPNG from '../../assets/img/avatar-1.png';
import SideModel from '../SideModel';
import styles from './profile.module.scss';
import countries from '../../data/countries.json';
import { languages } from '../../config/languages';

type Props = {
  showModel: boolean;
  setShowModel: Function;
}

const getLanguagesInArray = languages.map((language) => language.title);

enum tabsEnum {
  peronalInfo = 'peronalInfo',
  security = 'security'
}
type tabsType = `${tabsEnum}`


export default function Profile({ showModel, setShowModel }: Props) {
  const [form, setForm] = useState({ country: "", aboutYou: "" });
  const [userLanguage, setUserLanguage] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<tabsType>(tabsEnum.peronalInfo);

  const countryChangeHandler = (event: any) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setUserLanguage(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
     
    <SideModel showModel={showModel} setShowModel={setShowModel}>
      {/* Content for the side model profile */}
      <div className={styles.profile__container}>
        <div className={styles.avatar__actions}>
          <div className={styles.avatar}>
            <img src={AvatarPNG} alt='' />
          </div>
          <div className={styles.actions}>
            <Button variant='primary' text='Upload' />
            <Button variant='light' text='Delete' />
          </div>
        </div>
        <div className={styles.personal__security}>
          <div className={styles.tab__container}>

            <input 
              checked={activeTab === tabsEnum.peronalInfo ? true : false} 
              hidden data-name='personal-info' 
              type='radio' name='active-tab' 
              id='personal-info' 
              onChange={(e:any) => setActiveTab(e.target.checked ? tabsEnum.peronalInfo : tabsEnum.security)}
              className={styles.tab__option__input} />

            <label htmlFor='personal-info' className={styles.tab__label}>
              <span className={styles.item}>PERSONAL INFO</span>
            </label>


            <input checked={activeTab === tabsEnum.security ? true : false} 
             hidden data-name='security' 
             type='radio' 
             name='active-tab' 
             id='security' 
             className={styles.tab__option__input} 
             onChange={(e:any) => setActiveTab(e.target.checked ? tabsEnum.security : tabsEnum.peronalInfo)}
             />

            <label htmlFor='security' className={styles.tab__label}>
              <span className={styles.item}>SECURITY</span>
            </label>

            {/* Dispaly this tab content if personal infor tab is active */}
            <div className={styles.tab__contents}>
              <div className={styles.item} id='content-personal-info' data-name='personal-info'>

                <div className={styles.form__row}>
                  <Input
                    label="First Name"
                    id="first-name"
                    defaultValue=""
                    type="text"
                  //  error={true}
                  // helperText="Incorrect entry."
                  />

                  <Input
                    label="Last Name"
                    id="last-name"
                    defaultValue=""
                    type="text"
                  //  error={true}
                  // helperText="Incorrect entry."
                  />
                </div>

                <div className={styles.form__row}>
                  <Input
                    label="Email Address"
                    id="email-address"
                    defaultValue=""
                    type="text"
                  //  error={true}
                  // helperText="Incorrect entry."
                  />


                </div>

                <div className={styles.form__row}>
                  <Select options={countries}
                    value={form.country}
                    label={"Countries"}
                    onChange={countryChangeHandler}
                    id={"countries"}
                    name="country"
                  />
                </div>
                <div className={styles.form__row}>
                  <MultipleSelect size="large" options={getLanguagesInArray} handleChange={handleChange} label={"Langugaes"} id="languages" value={userLanguage} />

                </div>

                <TextArea rows={6} name="aboutYou" setter={countryChangeHandler} getter={form.aboutYou} placeholder="About you" />

              </div>
              <div className={styles.item} id='content-security' data-name='security'>
                <div className={styles.form__row}>
                  <InputAdornments label="New password" />
                </div>

                <div className={styles.form__row}>
                  <InputAdornments label="Confirm password" />
                </div>


              </div>
            </div>


          </div>
        </div>

        <div className={styles.actions__bottom}>
          <Button variant='primary' text='Update' />
        </div>
      </div>
    </SideModel>
  )
}