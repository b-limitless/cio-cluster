import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (
  el,
  {
    onNavigate,
    defaultHistory,
    initialPath,
    onSignIn,
    isSignedIn,
    showProfileSideModel,
    setShowProfileSideModel,
    setShowSettingModel, 
    showSettingModel
  }
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  console.log("d bootstrapjs", showSettingModel)
  ReactDOM.render(
    <App
      history={history}
      onSignIn={onSignIn}
      isSignedIn={isSignedIn}
      showProfileSideModel={showProfileSideModel}
      setShowProfileSideModel={setShowProfileSideModel}
      setShowSettingModel={setShowSettingModel}
      showSettingModel={showSettingModel}
    />,
    el
  );

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      console.log(nextPathname);
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#customize-id-dashboard");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
