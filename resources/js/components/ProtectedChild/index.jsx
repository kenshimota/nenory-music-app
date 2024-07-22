import { useAuth } from "../Auth";

const ProtectedChild = ({ roles = [], children, ...props }) => {
    const { currentUser } = useAuth();
    const hasRole = roles.includes(currentUser?.role?.name);

    if (!hasRole) {
        return null;
    }

    return children;
};

export default ProtectedChild;
