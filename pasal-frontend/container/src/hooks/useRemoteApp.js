import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";



function useRemoteApp(mount, {setShowSettingModel, showSettingModel, onSingIn, isSignIn, showProfileSideModel, setShowProfileSideModel }) {

  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          
          history.push(nextPathname);
        }
      },
      onSingIn,
      isSignIn,
      showProfileSideModel, 
      setShowProfileSideModel, 
      setShowSettingModel, 
      showSettingModel
    });
    history.listen(onParentNavigate);
  }, [isSignIn, showProfileSideModel, setShowProfileSideModel, setShowSettingModel, showSettingModel]);

  return <div ref={ref}></div>;
};

export default useRemoteApp;
