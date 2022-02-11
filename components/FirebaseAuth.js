import { initFirebase, db } from '@/lib/firebase/initFirebase';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, GoogleAuthProvider, } from 'firebase/auth';
import { setUserCookie } from '@/lib/firebase/usersCookies';
import { mapUserData } from '@/lib/firebase/mapUserData';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

initFirebase(); // initialize firebase

const auth = getAuth();

const firebaseAuthConfig = {
    signInFlow: 'popup',
    signInOptions: [ GoogleAuthProvider.PROVIDER_ID, ],
    signInSuccessUrl: '/',
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            const userData = mapUserData(authResult.user);
            setUserCookie(userData);

            if (authResult.additionalUserInfo.isNewUser) {
                setDoc(doc(db, 'users', userData.id), {
                    email: userData.email,
                    name: userData.name,
                    schedules: []
                }).then(() => {
                    toast.success("Úspěšně přihlášen")
                }).catch((err) => {
                    toast.error("Něco se pokazilo")
                });
                return false;
            }

            return true;
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