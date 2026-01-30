import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from './useAxiosPublic';
const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    // Use cached admin value immediately
    const [isAdmin, setIsAdmin] = useState(() => {
        const cached = localStorage.getItem('rahmah_is_admin');
        return cached ? JSON.parse(cached) : false;
    });

    const [loading, setLoading] = useState(() => {
        const cached = localStorage.getItem('rahmah_is_admin');
        return !cached; // Only load if not cached
    });

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosPublic.get('/users');
                const users = response.data;
                const currentUser = users.find(u => u.email === user.email);

                const isAdminUser = currentUser?.role?.trim().toLowerCase() === 'admin';

                // Update state and cache
                setIsAdmin(isAdminUser);
                localStorage.setItem('rahmah_is_admin', JSON.stringify(isAdminUser));
            } catch (error) {
                console.error('Error checking admin role:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, [user, axiosPublic]);

    return [isAdmin, loading];
};

export default useAdmin;