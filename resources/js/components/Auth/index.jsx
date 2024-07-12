import PropTypes from "prop-types";
import React, { useContext, createContext, useEffect, useState } from "react";

import useGetAPI from "../../hooks/useGetAPI";
import { useLocalStorage } from "@uidotdev/usehooks";
import sleep from "../../helpers/sleep";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [session, setSession] = useLocalStorage(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { request } = useGetAPI({ url: "/auth/me" });

    const loadUser = async function ({ token, type }) {
        const res = await request({
            headers: { Authorization: `${type} ${token}` },
        });

        if (!res) {
            return res;
        }

        setCurrentUser(res);
        return res;
    };

    const setToken = async ({ token, type, expirateAt }) => {
        await sleep(300);
        const res = await loadUser({ token, type });

        if (!res) {
            return res;
        }

        setSession({ token, type, expirateAt });
    };

    const clearToken = () => {
        setSession(null);
        setCurrentUser(null);
    };

    useEffect(() => {
        if (session && !currentUser) {
            loadUser({ token: session.token, type: session.type });
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ session, currentUser, setToken, setSession, clearToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const Auth = (props) => <AuthProvider {...props} />;

export default Auth;
