import { camelCaseToNormal } from "@pasal/cio-component-library";
import { FormInterface } from "../src/interfaces/user/inde";
import { SigninForm } from "../src/interfaces/user/inde";


type sumissionType = "signin" | "signup";

export const onSubmitHandler = (
  form: any,
  model: any,
  dispatch: React.Dispatch<any>,
  formType: sumissionType
) => {
  Object.keys(form).forEach((key) => {
    const formKey =
      formType === "signup"
        ? (key as keyof FormInterface)
        : formType === "signin"
        ? (key as keyof SigninForm)
        : (key as keyof FormInterface);
    const value = form[formKey] as string;

    if (!model[formKey].test(value)) {
      dispatch({
        type: "FORM_ERROR",
        payload: {
          formHasError: true,
          name: formKey,
          value: `${camelCaseToNormal(formKey, true)} is required`,
        },
      });
    }

    if (model[formKey].test(value)) {
      dispatch({
        type: "FORM_ERROR",
        payload: { formHasError: false, name: formKey, value: null },
      });
    }
  });
  dispatch({ type: "FORM_SUBMITTED", payload: true });
};
