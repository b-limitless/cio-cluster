import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useRemoteApp(
  mount,
  {
    setShowSettingModel,
    showSettingModel,
    showProfileSideModel,
    setShowProfileSideModel,
    actions, 
    store, 
    globalDispatch
  }
) {
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
      showProfileSideModel,
      setShowProfileSideModel,
      setShowSettingModel,
      showSettingModel,
      actions, 
      store,
      globalDispatch, 
      
    });
    history.listen(onParentNavigate);
  }, [
   
    showProfileSideModel,
    setShowProfileSideModel,
    setShowSettingModel,
    showSettingModel,
    actions, 
    store, 
    globalDispatch, 
  ]);

  return <div ref={ref}></div>;
}

export default useRemoteApp;
