import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Common/Loader/Loader";
import { AuthContext } from "../Provider/AuthProvider";
import useCurrentUserId from "../Hooks/useCurrentUserId";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const { currentUserId, loading: idLoading } = useCurrentUserId();
    const axiosPublic = useAxiosPublic();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchUserRole = async () => {
            if (currentUserId) {
                try {
                    const res = await axiosPublic.get(`/users/${currentUserId}`);
                    if (res.data.role === "admin") {
                        setIsAdmin(true);
                    }
                } catch {
                    setError("Failed to fetch user role");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (currentUserId) {
            fetchUserRole();
        }
    }, [currentUserId, axiosPublic]);

    if (authLoading || idLoading || loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white">
                <Loader />
            </div>
        );
    }

    if (!user || !isAdmin || error) {
        return <Navigate to="/err" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;