import { request } from '@pasal/cio-component-library';
import { useEffect } from 'react';

export default function isUserAuthenticated() {

  useEffect(() => {
    const currentUser = async () => {
      try {
        const { currentUser } = await request({
          url: '/api/users/currentuser',
          method: 'get'
        });
      } catch (err) {
        console.error('Count not fetch current user', err);
      } 
    }
    currentUser();
  }, []);

  return null;
}
