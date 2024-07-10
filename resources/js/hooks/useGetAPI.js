import useGetAxios from "./useGetAxios";

const useGetAPI = ({ url }) => {
    url = `${window.location.protocol}//${window.location.host}/api${url}`;
    return useGetAxios({ url });
};

export default useGetAPI;
