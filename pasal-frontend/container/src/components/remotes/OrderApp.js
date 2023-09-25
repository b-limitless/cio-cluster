import { mount } from "order/OrderApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({ onSingIn, isSignIn }) => {
  return useRemoteApp(mount, { onSingIn, isSignIn });
};
