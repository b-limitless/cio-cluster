import { mount } from "product/ProductApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({ onSingIn, isSignIn, actions, globalDispatch, product }) => {
  return useRemoteApp(mount, { onSingIn, isSignIn, actions, globalDispatch, product });
};
