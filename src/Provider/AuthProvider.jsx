import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create new user with email & password
    const createUser = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName,
                photoURL
            });
            // Send email verification
            await sendEmailVerification(userCredential.user);
            setUser({ ...userCredential.user, displayName, photoURL });
            return userCredential.user;
        } catch (error) {
            console.error("Error creating user:", error.message);
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const logIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Error logging in:", error.message);
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Update user profile
    const updateUserProfile = async (displayName, photoURL) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, { displayName, photoURL });
            setUser(prev => ({ ...prev, displayName, photoURL }));
        } catch (error) {
            console.error("Error updating profile:", error.message);
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("rahmah_user_id");
            localStorage.removeItem('rahmah_is_admin');
            localStorage.removeItem('rahmah_is_teacher');
            localStorage.removeItem('rahmah_is_student');
        } catch (error) {
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Send password reset email
    const sendResetPasswordEmail = async (email) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error("Error sending password reset email:", error.message);
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const resendVerificationEmail = async () => {
        setLoading(true);
        try {
            await sendEmailVerification(auth.currentUser);
            return { success: true };
        } catch (error) {
            console.error("Error resending verification email:", error.message);
            return { error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Track user authentication state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        updateUserProfile,
        logOut,
        sendResetPasswordEmail,
        resendVerificationEmail,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;