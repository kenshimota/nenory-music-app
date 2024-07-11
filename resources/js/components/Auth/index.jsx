import PropTypes from "prop-types";
import React, { useContext, createContext, useEffect, useState } from "react";
import useGetAPI from "../../hooks/useGetAPI";
import { useLocalStorage } from "@uidotdev/usehooks";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [session, setSession] = useLocalStorage(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { request } = useGetAPI({ url: "/auth/me" });

    const setToken = async ({ token, type, expirateAt }) => {
        const res = await request({
            headers: { Authorization: `${type} ${token}` },
        });

        if (!res) {
            return;
        }

        setSession({ token, type, expirateAt });
        setCurrentUser(res);
    };

    return (
        <AuthContext.Provider value={{ session, currentUser, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const Auth = (props) => <AuthProvider {...props} />;

export default Auth;
