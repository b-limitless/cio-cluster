import { mount } from "order/OrderApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default () => {
  return useRemoteApp(mount);
};
