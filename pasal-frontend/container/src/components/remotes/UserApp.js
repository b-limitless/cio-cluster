import useRemoteApp from "../../hooks/useRemoteApp";
import { mount } from "user/UserApp";
export default function UserApp({ }) {
  return useRemoteApp(mount);
}
