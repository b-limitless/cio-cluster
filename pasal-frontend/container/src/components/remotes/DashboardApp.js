import { mount } from "dashboard/DashboardApp";
import useRemoteApp from "../../hooks/useRemoteApp";
export default ({
  setShowSettingModel,
  showSettingModel,
  showProfileSideModel,
  setShowProfileSideModel,
  
}) => {
  return useRemoteApp(mount, {
    setShowSettingModel,
    showSettingModel,
    showProfileSideModel,
    setShowProfileSideModel,
    
  });
};
