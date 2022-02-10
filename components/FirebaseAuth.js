import { initFirebase } from '@/lib/firebase/initFirebase';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, GoogleAuthProvider, } from 'firebase/auth';
import { setUserCookie } from '@/lib/firebase/usersCookies';
import { mapUserData } from '@/lib/firebase/mapUserData';

initFirebase(); // initialize firebase

const auth = getAuth();

const firebaseAuthConfig = {
    signInFlow: 'popup',
    signInOptions: [ GoogleAuthProvider.PROVIDER_ID, ],
    signInSuccessUrl: '/',
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
            const userData = mapUserData(user);
            setUserCookie(userData);
        },
    },
};

const FirebaseAuth = () => {
    const [ renderAuth, setRenderAuth ] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRenderAuth(true);
        }
    }, []);

    return (
        <div>
            {renderAuth ? (
                <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={auth}/>) : null}
        </div>);
};

export default FirebaseAuth;