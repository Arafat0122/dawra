import { useState, useEffect } from "react";
import useCurrentUserId from "./useCurrentUserId";
import useAxiosPublic from "./useAxiosPublic";

const useDawraEnroll = () => {
    const { currentUserId, loading: userIdLoading, error: userIdError } = useCurrentUserId();
    const axiosPublic = useAxiosPublic();

    const [isEnrolled, setIsEnrolled] = useState(false);
    const [dawraData, setDawraData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUserId) {
            setLoading(false);
            setIsEnrolled(false);
            return;
        }

        const checkEnrollment = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get(`/dawra/${currentUserId}`);
                if (response.data?.success && response.data.dawra) {
                    setIsEnrolled(true);
                    setDawraData(response.data.dawra);
                } else {
                    setIsEnrolled(false);
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    setIsEnrolled(false);
                } else {
                    console.error("Error checking Dawra enrollment:", err);
                    setError("Failed to check Dawra enrollment.");
                }
            } finally {
                setLoading(false);
            }
        };

        checkEnrollment();
    }, [currentUserId, axiosPublic]);

    return { isEnrolled, dawraData, loading, error };
};

export default useDawraEnroll;