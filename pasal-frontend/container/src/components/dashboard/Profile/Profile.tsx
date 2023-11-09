import {useRef, Dispatch, useEffect, useReducer, useState, ChangeEvent } from 'react';
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
import { handleMediaChange } from '../../../functions/handleMediaChange';
import axios from 'axios';
import { defaultProfileImage } from '../../../config/mis';


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

interface UploadMedia {
  mediaUploaded: boolean;
  uploading: boolean;
  uploadError: null | string;
}

const userDetailsIntialState: UserDetailsInterface = {
  userDetails: null,
  loading: false,
  error: null
}

const uploadMediaInitialState: UploadMedia = {
  mediaUploaded: false,
  uploading: false, 
  uploadError: null
}



// Fetching users constant
const FETCHING_USER_DETAILS = 'FETCHING_USER_DETAILS';
const FETCHED_USER_DETAILS = 'FETCHED_USER_DETAILS';
const FETCHED_ERROR = 'FETCHED_ERROR';
const UPDATE_PROFILE = 'UPDATE_FORM';


// Upload media constant
const MEDIA_UPLOADING = 'MEDIA_UPLOADING';
const MEDIA_UPLOADED = 'MEDIA_UPLOADED';
const MEDIA_UPLOAD_ERROR = 'MEDIA_UPLOADED';
const MEDIA_ONCHANGE = 'MEDIA_UPLOADED';

function userDetailsReducer(state: UserDetailsInterface, action: any) {
  switch (action.type) {

    case UPDATE_PROFILE: {
      const { name, value } = action.payload;
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

function uploadMediaReducer(state: UploadMedia, action:any) {
  switch(action.type) {
    case MEDIA_ONCHANGE:
      return {...state, file: action.payload}
    case MEDIA_UPLOADING: 
      return {...state, uploading: action.payload}

    case MEDIA_UPLOADED:
      return {...state, success: action.payload};

    case MEDIA_UPLOAD_ERROR:
      return {...state, uploadError: action.payload}
    default:
      return state; 
  }
}



export default function Profile({ showModel, setShowModel }: Props) {
  type changeEvent = React.ChangeEvent<HTMLInputElement>;
  const [form, setForm] = useState({ country: "", aboutYou: "" });
  const [userLanguage, setUserLanguage] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<tabsType>(tabsEnum.peronalInfo);
  const [updatingProfile, setUpdatingProfile] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<null | string>(null); 
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageError, setProfileImageError] = useState<null | string>(null);

  const { auth: { auth } } = useSelector((state: RootState) => state);
  const [{ userDetails, loading, error }, dispatch] = useReducer(userDetailsReducer, userDetailsIntialState);
  const [{mediaUploaded, uploading, uploadError}, dispatchMedia] = useReducer(uploadMediaReducer, uploadMediaInitialState);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef< HTMLImageElement| null>(null);

  const onChangeEventLocal = (e: changeEvent) => {
    onChangeHandler(e, dispatch, UPDATE_PROFILE)
  }

  const languageChangeHandler = (e: changeEvent) => {
    const {
      target: { value },
    } = e;

    dispatch({ type: UPDATE_PROFILE, payload: { name: 'spokenLanguage', value: typeof value === 'string' ? value.split(',') : value } })
  }

  const updateProfileHandler = async() => {
    // Check if all field is filled
    // All fields are optional therefore 
    // No need to add validation 
    // fields supports null value 
    setUpdatingProfile(true);
    const {id,verified,email,withCredentials, ...body} = userDetails;

    try {
        await request({
        url: `${APIS.user.users}/${userDetails.id}`, 
        method: 'put',
        body
       });
    } catch(err:any) {
      throw new Error(err);
    }

    setUpdatingProfile(false);
    

    

  }

 
  const handleProfileImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    handleMediaChange(event, setProfileImageError, setProfileImage);

    // Need to display the selected file to dom 
    if(fileInputRef.current && imageRef.current) {
      const file = fileInputRef.current.files && fileInputRef.current.files[0]; 

      if(file) {
        const reader = new FileReader();

        reader.onload = function(e:ProgressEvent<FileReader>) {
          if(imageRef.current) {
            imageRef.current.src = e.target?.result as string;
          }
        }

        reader.readAsDataURL(file);
      } else {
        if(imageRef.current) {
          imageRef.current.src = defaultProfileImage;
        }
      }
    }
  }

  const uploadProfileMediaHandler = async() => {
    // Check file is set
    if(!profileImage) {
      dispatchMedia({type: MEDIA_UPLOAD_ERROR, payload: 'Please select profile image to upload'});
      return;
    }

    const formData = new FormData();
    formData.append('image', profileImage); 

    dispatchMedia({type: MEDIA_UPLOADING, payload: true}); 
    try {
      const uploadMedia = await axios.post(APIS.product.upload, formData, {
        headers: {

          'Content-Type': 'multipart/form-data',
      }
      });
      const { originalImageUrl, thumbnailImageUrl } = uploadMedia.data;
      
      dispatch({type: UPDATE_PROFILE, payload: {name: 'originalImageUrl', value: originalImageUrl}});
      dispatch({type: UPDATE_PROFILE, payload: {name: 'thumbnailImageUrl', value: thumbnailImageUrl}});
      dispatchMedia({type: MEDIA_UPLOADED, payload: true});
    } catch(err) {
      dispatchMedia({type: MEDIA_UPLOAD_ERROR, payload: err}); 
    }
    dispatchMedia({type: MEDIA_UPLOADING, payload: false}); 

  }

  const onDeleteProfileImageHandler = () => {
    if(imageRef.current && imageRef.current.src) {
      imageRef.current.src = defaultProfileImage;
      // Dispatch in the form as well empty the value for the profileImage
    }
    
    
  }

  console.log("profileImage", profileImage)


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
  

  console.log('mediaUploaded, uploading, uploadError', mediaUploaded, uploading, uploadError);
  console.log("userDetails", userDetails)


  return (

    <SideModel showModel={showModel} setShowModel={setShowModel}>
      {/* Content for the side model profile */}
      <div className={styles.profile__container}>
        <div className={styles.avatar__actions}>
          <div className={styles.avatar}>
            {/* <AvatarPNG/> */}
            <input 
              type="file" 
              name="" 
              id = "profile-image" 
              accept="image/*" 
              onChange={handleProfileImageUpload}
              hidden
              ref={fileInputRef}
              />
            <label htmlFor = "profile-image">
            <img 
              ref={imageRef}
              src={'https://e7.pngegg.com/pngimages/456/700/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-logo.png'} alt='' />
            </label>
            
          </div>
          <div className={styles.actions}>
            <Button variant='primary' text= {!uploading ? 'Upload' : 'UPLOADING'}onClick={!uploading ? uploadProfileMediaHandler : null}/>
            {/* <input type="file" name="" id="profile-picture" hidden/>
            <label htmlFor='profile-picture'>Upload</label> */}
            <Button variant='light' text='Delete' onClick={onDeleteProfileImageHandler}/>
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
                    onChange={(e: changeEvent) => onChangeEventLocal(e)}
                    // error={errors.deliveryTime ? true : false}
                    // helperText={errors.deliveryTime ? errors.deliveryTime : false} 
                  />

                  <Input
                    label="Last Name"
                    id="last-name"
                    value={userDetails?.lastName || ""}
                    type="text"
                    name="lastName"
                    onChange={(e: changeEvent) => onChangeEventLocal(e)}

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

                    value={userDetails?.country ?? ""}
                    label={"Countries"}
                    onChange={(e: changeEvent) => onChangeEventLocal(e)}
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
                    value={userDetails?.spokenLanguage ?? []}
                    name="spokenLanguage"
                  />

                </div>

                <TextArea 
                rows={6} 
                name="about" 
                setter={onChangeEventLocal} 
                getter={userDetails?.about ?? ""} 
                placeholder="About you" 
                
                />

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
          <Button variant='primary' text='Update' onClick={updateProfileHandler}/>
        </div>
      </div>
    </SideModel>
  )
}