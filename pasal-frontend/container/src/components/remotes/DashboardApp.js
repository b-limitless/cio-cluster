import { mount } from "dashboard/DashboardApp";
import useRemoteApp from "../../hooks/useRemoteApp";
export default ({setShowSettingModel, showSettingModel, onSingIn, isSignIn, showProfileSideModel, setShowProfileSideModel }) => {
  return useRemoteApp(mount, {setShowSettingModel, showSettingModel, onSingIn, isSignIn, showProfileSideModel, setShowProfileSideModel});
};
