import { request } from '@pasal/cio-component-library';
import { useEffect, useInsertionEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedUser } from '../reducers/authSlice';
import { RootState } from '../src/store';
import { APIS } from '../src/apis';

interface AuthenticatedUserInterface {
    setLoading: Function;
}
export default function useSetAuthenticatedUser({ setLoading }: AuthenticatedUserInterface) {

    const { auth: { auth } } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCurrentUser = async () => {

            try {
                const { currentUser } = await request({
                    url: APIS.auth.currentUser,
                    method: 'get'
                });
                dispatch(authenticatedUser(currentUser));
                setLoading(false);

            } catch (err) {
                console.error('Count not fetch current user', err);
            }

        }
        if (auth) {
            setLoading(false);
        }
        if (!auth) {
            setLoading(true);
            fetchCurrentUser();


        }
    }, []);
    return null;
}