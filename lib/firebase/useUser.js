import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initFirebase } from '@/lib/firebase/initFirebase';
import { getAuth } from 'firebase/auth';
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from '@/lib/firebase/usersCookies';
import { mapUserData } from '@/lib/firebase/mapUserData';

initFirebase();

const useUser = () => {
    const [ user, setUser ] = useState();
    const router = useRouter();
    const auth = getAuth();

    const logout = async () => {
        try {
            await auth.signOut();
            removeUserCookie();
            await router.push('/login');
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        const cancelAuthListener = auth.onIdTokenChanged((user) => {
            if (user) {
                const userData = mapUserData(user);
                setUserCookie(userData);
                setUser(userData);
            } else {
                removeUserCookie();
                setUser();
            }
        });

        const userFromCookie = getUserFromCookie();
        if (!userFromCookie) {
            router.push('/');
            return;
        }
        setUser(userFromCookie);

        return () => {
            cancelAuthListener();
        };
    }, []);

    return { user, logout };
};

export { useUser };41