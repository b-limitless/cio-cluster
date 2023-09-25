import useRemoteApp from "../../hooks/useRemoteApp";
import { mount } from "user/UserApp";
export default function UserApp({ onSingIn, isSignIn }) {
  return useRemoteApp(mount, { onSingIn, isSignIn });
}
