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

    useEffect(() => {
        const headers = {};

        if (session) {
            headers.Authorization = `${session.type} ${session?.token}`;
        }

        request({ headers });
    }, [queryString]);

    useEffect(() => {
        if (status === 401) {
            clearToken(session.token);
        }
    }, [session, status]);

    return { ...state, status };
};

export default useAutoGetAPI;
