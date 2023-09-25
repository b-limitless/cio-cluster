import { mount } from "payment/PaymentApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({ onSingIn, isSignIn }) => {
  return useRemoteApp(mount, { onSingIn, isSignIn });
};
