export interface SigninForm {
  email: string;
  password: string;
  message?: string;
}



export interface FormInterface extends SigninForm {
  fullName: string;
  confirmPassword: string;
  agreement?: boolean;
}

export interface FormError {
  fullName: null | string;
  email: null | string;
  password: null | string;
  confirmPassword: null | string;
  agreement: null | string;
}
export interface FormState {
  submitting: boolean;
  form: FormInterface;
  submissionError: null | string;
  success: null | boolean;
  formError: FormError;
  formHasError: null | boolean;
  formSubmitted: boolean;
}
