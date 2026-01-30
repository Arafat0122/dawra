import { useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../Provider/AuthProvider';
import Loader from '../Common/Loader/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white"><Loader /></div>
        );
    }

    // Not logged in → go to login but keep track of where user came from
    if (!user?.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Logged in but NOT verified → send to verify page AND keep source page info
    if (user?.email && user?.emailVerified === false) {
        return <Navigate to="/verify-email" state={{ from: location }} replace />;
    }

    // Verified → allow
    if (user?.email && user?.emailVerified === true) {
        return children;
    }

    return null;
};

export default PrivateRoute;