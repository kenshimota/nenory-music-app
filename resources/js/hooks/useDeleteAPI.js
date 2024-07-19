
import useDeleteAxios from "./useDeleteAxios";
import { useAuth } from "../components/Auth";

const useDeleteAPI = ({ url }) => {
    const { session, clearToken } = useAuth() || {};
    url = `${window.location.protocol}//${window.location.host}/api${url}`;
    const {request:r, ...state} = useDeleteAxios({ url });

    const request = async () => {
        const headers = {};

        if (session) {
            headers.Authorization = `${session.type} ${session?.token}`;
        }

        await r({ headers });
    }


    return { ...state, request };
};

export default useDeleteAPI;
