import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    GithubAuthProvider,
    signOut
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import app from "../FIrebase/firebaseInit";


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const createUserWithEmail = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } finally {
            setLoading(false);
        }
    };

    const loginUserWithEmail = async (email, password) => {
        setLoading(true)
        try {
            const Login = await signInWithEmailAndPassword(auth, email, password);
            return Login;
        } finally {
            setLoading(false)
        }
    };


    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const signInGoogle = await signInWithPopup(auth, provider);
            return signInGoogle
        } finally {
            setLoading(false);
        }
    };

    const signInGithub = async () => {
        setLoading(true);
        try {
            const provider = new GithubAuthProvider();
            provider.addScope('repo');
            provider.setCustomParameters({
                'allow_signup': 'false'
            });
            const signInUserWithGithub = await signInWithPopup(auth, provider);
            return signInUserWithGithub
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            const signOutUser = await signOut(auth);
            return signOutUser;
        } finally {
            setLoading(false);
        }
    }



    const authData = {
        user,
        loading,
        logOut,
        setUser,
        setLoading,
        signInGithub,
        signInWithGoogle,
        loginUserWithEmail,
        createUserWithEmail,


    }

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider