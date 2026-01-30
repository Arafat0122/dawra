import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useDawraEnroll from "../Hooks/useDawraEnroll";
import Loader from "../Common/Loader/Loader";
import BlockedUser from "../Common/BlockedUser/BlockedUser";

const EnrolledRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const { isEnrolled, loading: enrollLoading, error: enrollError, dawraData } = useDawraEnroll();
    const location = useLocation();

    if (authLoading || enrollLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white">
                <Loader />
            </div>
        );
    }

    if (!user || enrollError) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Not enrolled
    if (!isEnrolled) {
        return <Navigate to="/apply" state={{ from: location }} replace />;
    }

    // Enrolled but blocked
    if (dawraData?.status !== "active") {
        return <Navigate to="/block-user" replace />;
    }

    // Enrolled and active
    return children;
};

export default EnrolledRoute;