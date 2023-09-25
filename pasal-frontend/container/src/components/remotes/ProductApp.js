import { mount } from "product/ProductApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({ onSingIn, isSignIn }) => {
  return useRemoteApp(mount, { onSingIn, isSignIn });
};
