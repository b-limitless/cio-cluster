import {emailRegex, validString, passwordRegex} from '@pasal/cio-component-library'
import { FormInterface, SigninForm } from '../interfaces/user/inde';

export const signInModel: Partial<Record<keyof SigninForm, RegExp>> = {
    email: emailRegex,
    password: passwordRegex,
}

export const userModel:Partial<Record<keyof FormInterface, RegExp>> = {
    fullName: validString,
    ...signInModel,
    confirmPassword: passwordRegex,
    agreement: /^(true)$/i
    
}