import React from "react";
import { useAuth } from "../Auth";
import { Navigate } from "react-router-dom";

const RouterWithoutSession = (Component) => (props) => {
    const { session } = useAuth();

    if (session) {
        return <Navigate to="/" />;
    }

    return <Component {...props} />;
};

export default RouterWithoutSession;
