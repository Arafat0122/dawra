import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const useTeacher = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [isTeacher, setIsTeacher] = useState(() => {
        const cached = localStorage.getItem('rahmah_is_teacher');
        return cached ? JSON.parse(cached) : false;
    });

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(() => {
        const cached = localStorage.getItem('rahmah_is_teacher');
        return !cached; // If no cache, show loading
    });

    useEffect(() => {
        const checkTeacherStatus = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosPublic.get('/users');
                const users = response.data;
                const currentUser = users.find(u => u.email === user.email);

                if (currentUser) {
                    const isTeacherUser = currentUser.role?.trim().toLowerCase() === 'teacher';

                    // Update role and cache
                    setIsTeacher(isTeacherUser);
                    localStorage.setItem('rahmah_is_teacher', JSON.stringify(isTeacherUser));

                    // Always update balance
                    setBalance(currentUser.balance || 0);
                }
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            } finally {
                setLoading(false);
            }
        };

        checkTeacherStatus();
    }, [user, axiosPublic]);

    return [isTeacher, loading, balance];
};

export default useTeacher;