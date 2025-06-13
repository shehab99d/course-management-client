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
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            // ✅ JWT token fetch
            if (currentUser) {
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: currentUser.email })
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('access-token', data.token);
                    });
            } else {
              
                localStorage.removeItem('access-token');
            }
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
        setLoading(true);
        try {
            const login = await signInWithEmailAndPassword(auth, email, password);
            return login;
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result;
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
            const result = await signInWithPopup(auth, provider);
            return result;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } finally {
            setLoading(false);
        }
    };

    const authData = {
        user,
        loading,
        logOut,
        setUser,
        setLoading,
        signInGithub,
        signInWithGoogle,
        loginUserWithEmail,
        createUserWithEmail
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
