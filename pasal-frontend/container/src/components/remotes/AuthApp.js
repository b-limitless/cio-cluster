import { mount } from "auth/AuthApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({ onSingIn, isSignIn, actions, globalDispatch }) => {

  return useRemoteApp(mount, { onSingIn, isSignIn, actions, globalDispatch });
};
