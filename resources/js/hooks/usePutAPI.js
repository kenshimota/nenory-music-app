import usePutAxios from "./usePutAxios";
import { useAuth } from "../components/Auth";

const usePutAPI = ({ url }) => {
    const headers = {};
    const { session } = useAuth();

    url = `${window.location.protocol}//${window.location.host}/api${url}`;

    if (session) {
        headers.Authorization = `${session.type} ${session?.token}`;
    }

    return usePutAxios({ url, headers });
};

export default usePutAPI;
