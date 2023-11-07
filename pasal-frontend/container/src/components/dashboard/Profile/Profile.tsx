import { Dispatch, useEffect, useReducer, useState } from 'react';
import { Button, Input, Select, MultipleSelect, TextArea, InputAdornments, request } from '@pasal/cio-component-library';
import React from 'react';
import AvatarPNG from '../../../assets/svg/users.svg';
import SideModel from '../SideModel';
import styles from './profile.module.scss';
import countries from '../../../data/countries.json';
import { languages } from '../../../config/languages';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { APIS } from '../../../config/apis';
import { userType } from '../../../../reducers/userSlice';
import { onChangeHandler } from '../../../functions/onChangeHandler';


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

interface UserDetailsInterface {
  userDetails: userType | null
  loading: boolean,
  error: null | string
}

const userDetailsIntialState: UserDetailsInterface = {
  userDetails: null,
  loading: false,
  error: null
}

const FETCHING_USER_DETAILS = 'FETCHING_USER_DETAILS';
const FETCHED_USER_DETAILS = 'FETCHED_USER_DETAILS';
const FETCHED_ERROR = 'FETCHED_ERROR';
const UPDATE_PROFILE = 'UPDATE_FORM';

function userDetailsReducer(state: UserDetailsInterface, action: any) {
  switch (action.type) {

    case UPDATE_PROFILE: {
      const {name, value} = action.payload;
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [name]: value
        }
      }

    }
    case FETCHING_USER_DETAILS:
      return { ...state, loading: action.payload };
    case FETCHED_USER_DETAILS:
      return { ...state, userDetails: action.payload };
    case FETCHED_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}


export default function Profile({ showModel, setShowModel }: Props) {
  type changeEvent = React.ChangeEvent<HTMLInputElement>;
  const [form, setForm] = useState({ country: "", aboutYou: "" });
  const [userLanguage, setUserLanguage] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<tabsType>(tabsEnum.peronalInfo);

  const { auth: { auth } } = useSelector((state: RootState) => state);
  const [{ userDetails, loading, error }, dispatch] = useReducer(userDetailsReducer, userDetailsIntialState)



  const countryChangeHandler = (event: any) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleChange = (event: changeEvent) => {
    const {
      target: { value },
    } = event;
    setUserLanguage(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onChangeEventLocal = (e:changeEvent) => {
    onChangeHandler(e, dispatch, UPDATE_PROFILE)
  }

  const languageChangeHandler = (e:changeEvent) => {
    let {
      target: { value },
    } = e;

    value = value.toString();

    let languages = [...userDetails.spokenLanguage];

   
    if(languages.indexOf(value) === -1) {
      languages = [...languages, value];
    } else {
      languages = languages.filter((language:string) => language !== value); 
    }
    dispatch({type: UPDATE_PROFILE, payload: {name: 'spokenLanguage', value: languages}})
  }


  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!auth?.id) {
        return;
      }
      dispatch({ type: FETCHING_USER_DETAILS, payload: true });
      try {
        const reponse = await request({
          url: `${APIS.user.users}/${auth?.id}`,
          method: 'get'
        });
        dispatch({ type: FETCHED_USER_DETAILS, payload: reponse });

      } catch (err: any) {
        dispatch({ type: FETCHED_ERROR, payload: err });
        throw new Error(err);
      }
    }
    fetchUserProfile();
  }, [auth?.id]);

  console.log("userDetails", userDetails)
  console.log("userLanguage", userLanguage);

  


  return (

    <SideModel showModel={showModel} setShowModel={setShowModel}>
      {/* Content for the side model profile */}
      <div className={styles.profile__container}>
        <div className={styles.avatar__actions}>
          <div className={styles.avatar}>
            {/* <AvatarPNG/> */}
            <img src={'https://e7.pngegg.com/pngimages/456/700/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-logo.png'} alt='' />
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
              onChange={(e: any) => setActiveTab(e.target.checked ? tabsEnum.peronalInfo : tabsEnum.security)}
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
              onChange={(e: any) => setActiveTab(e.target.checked ? tabsEnum.security : tabsEnum.peronalInfo)}
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
                    value={userDetails?.firstName || ""}
                    type="text"
                    name="firstName"
                    onChange={(e:changeEvent) => onChangeEventLocal(e)}
                  //  error={true}
                  // helperText="Incorrect entry."
                  />

                  <Input
                    label="Last Name"
                    id="last-name"
                    value={userDetails?.lastName || ""}
                    type="text"
                    name="lastName"
                    onChange={(e:changeEvent) => onChangeEventLocal(e)}

                  //  error={true}
                  // helperText="Incorrect entry."
                  />
                </div>

                <div className={styles.form__row}>
                  <Input
                    label="Email Address"
                    id="email-address"
                    value={userDetails?.email || ""}
                    type="text"
                    name="email"
                    disabled={true}
                  //  error={true}
                  // helperText="Incorrect entry."
                  />


                </div>

                <div className={styles.form__row}>
                  <Select options={countries}
                    value={form.country}
                    label={"Countries"}
                    onChange={(e:changeEvent) => onChangeEventLocal(e)}
                    id={"countries"}
                    name="country"
                  />
                </div>
                <div className={styles.form__row}>
                  <MultipleSelect size="large"
                    options={getLanguagesInArray}
                    handleChange={languageChangeHandler}
                    label={"Langugaes"}
                    id="languages"
                    value={userLanguage}
                    name="spokenLanguage"
                  />

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