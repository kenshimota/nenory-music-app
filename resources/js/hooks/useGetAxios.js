import axios from "axios";

import { useState } from "react";

const useGetAxios = ({ url }) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const request = async ({ headers }) => {
        setStatus(null);
        setError(null);
        setLoading(true);

        try {
            const { data: res, status } = await axios.get(url, { headers });
            setResponse(res);
            setStatus(status);
            return res;
        } catch (error) {
            if (error.response) {
                setStatus(error.response.status);
                setError(error.response.data);
                return null;
            }

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, error, response, status };
};

export default useGetAxios;
