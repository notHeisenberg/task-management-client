import {
    createUserWithEmailAndPassword,
    getAuth,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import useAxiosCommon, { axiosCommon } from "../../hooks/useAxiosCommon";
import app from "../FirebaseProivder/FirebaseProvider";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const auth = getAuth(app);
    const axios = useAxiosCommon();

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const profileUpdate = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        });
    };

    const passwordUpdate = async (password) => {
        setLoading(true);
        try {
            // const credential = await promptForCredentials();
            // await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, password);
        } catch (error) {
            console.error("Error updating password: ", error);
        } finally {
            setLoading(false);
        }
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                axiosCommon.post('/jwt', { email: currentUser?.email }, { withCredentials: true })
                    .then(res => {
                        localStorage.setItem('access-token', res.data.token);
                    })
                    .catch(error => console.log(error.message));
            } else {
                localStorage.removeItem('access-token');
            }
        });
        return () => {
            unSubscribe();
        };
    }, [auth, axios]);

    const authInfo = {
        user,
        loading,
        setLoading,
        createAccount,
        profileUpdate,
        passwordUpdate,
        logIn,
        googleSignIn,
        githubSignIn,
        logOut,
        isDarkMode,
        setIsDarkMode,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
