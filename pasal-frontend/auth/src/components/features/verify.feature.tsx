import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Input,
  InputAdornments,
} from "@pasal/cio-component-library"
import { APIS } from '../../config/apis';
import { FormHelperText } from '@material-ui/core';
import { colors } from '@pasal/cio-component-library';
import { Link } from 'react-router-dom';
import { request } from '@pasal/cio-component-library';

type Props = {}

const validLength = {
  inputProps: {
    maxLength: 1,
    minLength: 1,
    pattern: /[0-9]{1}/,
  }
}



export default function VerifyFeature({ }: Props) {
  const [verifying, setVerifying] = useState(false);
  const [userVerificationError, setUserVerificationError] = useState<null | string>(null);
  const [userVerified, setUserVerified] = useState(false);
  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;

    // Check if the input is not empty and the value is a digit
    if (value !== '' && /^\d$/.test(value)) {
      // Automatically focus on the next input field if available
      if (index < inputRefs.length - 1 && inputRefs[index + 1].current) {
        // @ts-ignore
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace') {

      // Move focus to the previous input field when Backspace is pressed
      if (index > 0 && inputRefs[index - 1].current) {
        // @ts-ignore
        inputRefs[index].current.value = ''
        // @ts-ignore  
        inputRefs[index - 1].current.focus();
      }
    }
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('text');

    // Remove non-digit characters from the pasted text
    const digits = pastedText.replace(/\D/g, '').split('');

    // Distribute each digit to the corresponding input field
    digits.forEach((digit, index) => {
      if (inputRefs[index] && inputRefs[index].current) {
        // @ts-ignore
        inputRefs[index].current.value = digit;
        // @ts-ignore
        inputRefs[index].current.focus();
      }
    });

    event.preventDefault(); // Prevent the default paste behavior
  };

  const verifyUserHanlder = async () => {
    setUserVerificationError(null);

    const verificationCode = inputRefs.map((ref) => ref?.current?.value).join('').trim();

    if (verificationCode.length !== 5) {
      setUserVerificationError('Please enter verirication code');
      return;
    }

    setVerifying(true)
    try {

      const response = await request({
        url: APIS.auth.verify,
        body: { verificationCode },
        method: 'post'
      });

      if(response.verified) {
        
        setUserVerified(true);
      
      }
    } catch (err: any) {
      const { response: { data: { errors: [index] } } } = err;
      setUserVerificationError(index.message);
    }
    setVerifying(false);
  }

  const getTitle = useCallback(() => {
    if(!userVerified) {
      return 'Please enter verification code';
    }

    if(userVerified) {
      return 'Thank you for verifying'
    }

    return null;
  }, [userVerified])

  const gePurpose = useCallback(() => {
    if(!userVerified) {
      return 'Please check you inbox or spam, We have sent you en email for the verification.';
    }

    if(userVerified) {
      return 'You can go to dahsboard'
    }
    return null;
  }, [userVerified])

  const getActionButton = useCallback(() => {
    if(!userVerified) {
      return <Button 
        variant="primary" 
        text={verifying ? "Please wait..." : "Verify"} 
        onClick={verifying ? null : verifyUserHanlder}>
        </Button>;
    }

    if(userVerified) {
      return <Link to={'/dashboard'}>
      <Button 
          variant="primary" 
          text={'Go to dahsboard'} 
          onClick={null}></Button>;
      </Link>
    }

    return null;
  }, [userVerified]);

  return (
    <div className="group-elements">
      <div className="row registration">
        <div className="title">{getTitle()}</div>
        <div className="purpose">
          {gePurpose()}
        </div>
        {!userVerified && <div className="verfication-form">
          {inputRefs.map((inputRef, index) => (
            <Input
              key={index}
              inputRef={inputRef}
              onChange={(e: any) => handleInputChange(e, index)}
              onPaste={handlePaste}
              onKeyDown={(e: any) => handleKeyDown(e, index)}
              inputProps={{
                maxLength: 1,
              }}
            />
          ))}

        </div>}

        {userVerificationError && <FormHelperText style={{ color: colors.red }}>
          {userVerificationError}
        </FormHelperText>}

        <div className="form">
              {getActionButton()}
        </div>
      </div>
    </div>

  )
}