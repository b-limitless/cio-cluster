import { mount } from "auth/AuthApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({actions, globalDispatch }) => {

  return useRemoteApp(mount, {actions, globalDispatch });
};
