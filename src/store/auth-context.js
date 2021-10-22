import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userRole: -1,
    login: (token) => { },
    logout: () => { },
    setUserRole: (userRole) => { },
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const userRoleHandler = (userRole) => {
        localStorage.setItem('userRole', userRole);
        setUserRole(userRole);
    }

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserRole(null);
        setUserID(null);
        setCompanyID(null);
        localStorage.clear();
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        // Save userID and companyID in local storage.
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler, userRole]);

    const [userID, setUserID] = useState('');
    const [companyID, setCompanyID] = useState('');

    useEffect(() => {
        let localUserID = localStorage.getItem('userID');
        let localCompanyID = localStorage.getItem('companyID');
        let localUserRole = localStorage.getItem('userRole');

        //Fail safe localstorage read.
        if (localUserID === "null" || localUserID === "undefined") {
            localUserID = '';
        }

        if (localCompanyID === "null" || localCompanyID === "undefined") {
            localCompanyID = '';
        }

        if (!userID && localUserID) {
            setUserID(localUserID);
        } else {
            userID && localStorage.setItem('userID', userID);
        }

        if (!companyID && localCompanyID) {
            setCompanyID(localCompanyID);
        } else {
            companyID && localStorage.setItem('companyID', companyID);
        }

        setUserRole(localUserRole);
    }, [userID, companyID]);

    const contextValue = {
        token: token,
        userRole: userRoleHandler,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        isUser: userRole,
        userID, setUserID,
        companyID, setCompanyID,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;