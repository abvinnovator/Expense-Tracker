import React from 'react'

export const useGetUserInfo = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const { name, profilePhoto, userID, isAuth } = authData || {};

    return { name, profilePhoto, userID, isAuth };
}
