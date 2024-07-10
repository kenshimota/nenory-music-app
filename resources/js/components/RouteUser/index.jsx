import React from "react";

import { useAuth } from "../Auth";
import { Navigate } from "react-router-dom";

const RouterUser = (Component) => (props) => {
    const { session } = useAuth();

    if (!session) {
        return <Navigate to="/login" />;
    }

    return <Component {...props} />;
};

export default RouterUser;
