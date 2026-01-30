import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const CACHE_KEY = "rahmah_stats";
const CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

const useStats = () => {
    const axiosPublic = useAxiosPublic();
    const [stats, setStats] = useState({
        students: 0,
        teachers: 0,
        jobs: 0,
        services: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(`${CACHE_KEY}_timestamp`);
        const now = Date.now();

        if (cachedData && cachedTime && now - cachedTime < CACHE_TTL) {
            setStats(JSON.parse(cachedData));
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const [jobsRes, servicesRes, teachersRes, usersRes] = await Promise.all([
                    axiosPublic.get("/jobs"),
                    axiosPublic.get("/services"),
                    axiosPublic.get("/eligible-teachers"),
                    axiosPublic.get("/users"),
                ]);

                const updatedStats = {
                    jobs: jobsRes.data.length,
                    services: servicesRes.data.length,
                    students: usersRes.data.filter((user) => user.role === "student").length,
                    teachers: teachersRes.data.filter((user) => user.role === "teacher").length,
                };

                setStats(updatedStats);
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(updatedStats));
                sessionStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());
            } catch (err) {
                console.error("Failed to fetch stats:", err);
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosPublic]);

    return { stats, loading, error };
};

export default useStats;