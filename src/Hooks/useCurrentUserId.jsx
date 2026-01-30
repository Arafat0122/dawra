import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useCurrentUserId = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("rahmah_user_id"));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            if (!user || !user.email) {
                setLoading(false);
                return;
            }

            const cachedUserId = localStorage.getItem("rahmah_user_id");

            // Use cached ID if it exists
            if (cachedUserId) {
                setCurrentUserId(cachedUserId);
                setLoading(false);
                return;
            }

            try {
                const response = await axiosPublic.get(`/verified-users`);
                const users = response.data;
                const matchedUser = users.find(u => u.email === user.email);

                if (matchedUser) {
                    localStorage.setItem("rahmah_user_id", matchedUser._id);
                    setCurrentUserId(matchedUser._id);
                } else {
                    setError("User not found.");
                }
            } catch (err) {
                console.error("Error fetching verified users:", err);
                setError("An error occurred while fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserId();
    }, [user, axiosPublic]);

    return { currentUserId, loading, error };
};

export default useCurrentUserId;