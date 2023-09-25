import { mount } from "auth/AuthApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({ onSingIn, isSignIn }) => {
  return useRemoteApp(mount, { onSingIn, isSignIn });
};
