import { Navigate } from "react-router-dom";

const ProtectedLogOut = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/ChatRoom" replace />;
    }
    return children;
};
export default ProtectedLogOut;
