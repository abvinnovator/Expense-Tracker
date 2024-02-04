import React, { useEffect } from "react";
import "./styles.css"
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
    const { isAuth } = useGetUserInfo();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/expense-tracker");
        }
    }, [isAuth, navigate]);

    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/expense-tracker");
        } catch (error) {
            console.error("Error signing in with Google:", error);
            // Handle error, show message to the user, etc.
        }
    };

    return (
        <>
            <div className="login-page">
                <h1>Welcome to Your Expense Tracker</h1>
                <p>Keep track of your expenses easily with our Expense Tracker app.</p>
                <p>Sign in with Google to continue:</p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
        </>
    );
};
