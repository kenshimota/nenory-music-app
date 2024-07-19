import { useEffect } from "react";

import useGetAPI from "./useGetAPI";
import { useAuth } from "../components/Auth";

const useAutoGetAPI = ({ url, query }) => {
    const { session, clearToken } = useAuth() || {};
    const queryParams = new URLSearchParams(query);
    const queryString = queryParams.toString();
    const { request, status, ...state } = useGetAPI({
        url: `${url}?${queryString}`,
    });

    const reload = () => {
        const headers = {};

        if (session) {
            headers.Authorization = `${session.type} ${session?.token}`;
        }

        request({ headers });
    };

    useEffect(() => {
        reload();
    }, [queryString]);

    useEffect(() => {
        if (status === 401) {
            clearToken(session.token);
        }
    }, [session, status]);

    return { ...state, status, reload };
};

export default useAutoGetAPI;
