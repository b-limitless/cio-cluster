import { mount } from "payment/PaymentApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default () => {
  return useRemoteApp(mount);
};
