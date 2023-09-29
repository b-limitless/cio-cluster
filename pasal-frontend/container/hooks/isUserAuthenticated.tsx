import React, { useLayoutEffect } from 'react'
import { request } from '@pasal/cio-component-library'; 
import { useHistory } from 'react-router-dom';

export default function isUserAuthenticated() {
  const history = useHistory();
 
  useLayoutEffect(() => {
    const currentUser = async() => {
        try {
             await request({
                url: '/api/users/currentuser', 
                method: 'get'
            });
        } catch (err) {
            
        }
    }
    currentUser();
  }, []);

  return null;
}
