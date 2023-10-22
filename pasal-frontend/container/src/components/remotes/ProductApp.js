import React from "react";
import { mount } from "product/ProductApp";
import useRemoteApp from "../../hooks/useRemoteApp";
import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
// actions, globalDispatch, product 
export default function ProductApp() {
  const ref = useRef(null);
  const history = useHistory();

  // useEffect(() => {
  //   const { onParentNavigate } = mount(ref.current, {
  //     initialPath: history.location.pathname,
  //     onNavigate: ({ pathname: nextPathname }) => {
  //       const { pathname } = history.location;
  //       if (pathname !== nextPathname) {
  //         history.push(nextPathname);
  //       }
  //     },
  //   });
  //   history.listen(onParentNavigate);
  // }, [

  // ]);

  return <div ref={ref}></div>;
}
