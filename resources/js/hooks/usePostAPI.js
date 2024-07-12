import usePostAxios from "./usePostAxios";

const usePostAPI = ({ url }) => {
    url = `${window.location.protocol}//${window.location.host}/api${url}`;
    return usePostAxios({ url });
};

export default usePostAPI;
