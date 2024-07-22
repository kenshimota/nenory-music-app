import React from "react";
import { useAuth } from "../Auth";

import NotFoundScreen from "../../screens/NotFoundScreen";
import Loading from "../Loading";

const ProtectedScreen = function ({ roles, children }) {
    const { currentUser, loading } = useAuth();
    const hasRole = roles.includes(currentUser?.role?.name);

    if (loading || !currentUser) {
        return <Loading />;
    }

    if (!hasRole) {
        return <NotFoundScreen />;
    }

    return children;
};

export default ProtectedScreen;
