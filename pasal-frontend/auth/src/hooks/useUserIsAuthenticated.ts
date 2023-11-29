import { request } from "@pasal/cio-component-library";
import React, { useEffect } from "react";
import { APIS } from "../config/apis";
import { useHistory } from "react-router-dom";

interface UserIsAuthenticated {
    history: any;
}
export default function useUserIsAuthenticated({history}: UserIsAuthenticated) {
//   const history = useHistory();

  useEffect(() => {
    const userIsAuthenticated = async () => {
      try {
         await request({
          url: APIS.auth.currentUser,
          method: "get",
          unauthrizedRedirect: false
        });
        console.log("user is already logged in")
        history.push("/dashboard");
      } catch (err:any) {
        throw new Error(err);
      }
    };
    userIsAuthenticated();
  }, []);
}
