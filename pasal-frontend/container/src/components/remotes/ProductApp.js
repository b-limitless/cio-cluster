import { mount } from "product/ProductApp";
import useRemoteApp from "../../hooks/useRemoteApp";
// actions, globalDispatch, product 
export default ({setShowSettingModel }) => {
  return useRemoteApp(mount, {setShowSettingModel});  //{actions, globalDispatch, product }
};
