import { useAuth } from "../components/Auth";
import usePostAxios from "./usePostAxios";

const usePostAPI = ({ url }) => {
    const headers = {};
    const { session } = useAuth();

    url = `${window.location.protocol}//${window.location.host}/api${url}`;

    if (session) {
        headers.Authorization = `${session.type} ${session?.token}`;
    }

    return usePostAxios({ url, headers });
};

export default usePostAPI;
