export interface FormInterface {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement?:boolean;
}



export interface FormError {
    fullName: null | string,
    email: null | string,
    password: null | string,
    confirmPassword: null | string, 
    agreement: null | string
}
export interface FormState {
  submitting: boolean;
  form: FormInterface;
  submissionError: null | string;
  success: null | boolean;
  formError: FormError
  formHasError: null | boolean;
  formSubmitted: boolean
  
}
