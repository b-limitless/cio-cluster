import { mount } from "product/ProductApp";
import useRemoteApp from "../../hooks/useRemoteApp";

export default ({ actions, globalDispatch, product }) => {
  return useRemoteApp(mount, {actions, globalDispatch, product });
};
