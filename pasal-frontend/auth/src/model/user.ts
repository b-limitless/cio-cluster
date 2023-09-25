import {emailRegex, validString, passwordRegex} from '@pasal/cio-component-library'
import { FormInterface } from '../interfaces/user/inde';

export const userModel:Record<keyof FormInterface, RegExp> = {
    fullName: validString,
    email: emailRegex,
    password: passwordRegex,
    confirmPassword: passwordRegex,
    agreement: /^(true)$/i
    
}