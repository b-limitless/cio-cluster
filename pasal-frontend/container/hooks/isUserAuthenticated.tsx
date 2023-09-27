import React, { useEffect } from 'react'
import { request } from '../src/utils/request'; 
import { useHistory } from 'react-router-dom';

export default function isUserAuthenticated() {
  const history = useHistory();
 
  useEffect(() => {
    const currentUser = async() => {
        try {
             await request({
                url: '/api/users/currentuser', 
                method: 'get'
            });
        } catch (err) {
            history.push('/auth/signup')
        }
    }
    currentUser();
  }, []);

  return null;
}
