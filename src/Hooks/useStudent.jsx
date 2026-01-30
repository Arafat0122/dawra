import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const useStudent = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    // Use cached value instantly
    const [isStudent, setIsStudent] = useState(() => {
        const cached = localStorage.getItem('rahmah_is_student');
        return cached ? JSON.parse(cached) : false;
    });

    const [loading, setLoading] = useState(() => {
        const cached = localStorage.getItem('rahmah_is_student');
        return !cached; // Only load if no cached value
    });

    useEffect(() => {
        const checkStudentStatus = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosPublic.get('/users');
                const users = response.data;
                const currentUser = users.find(u => u.email === user.email);

                if (currentUser) {
                    const isStudentUser = currentUser.role?.trim().toLowerCase() === 'student';

                    // Always update cache and state (in case role changed)
                    setIsStudent(isStudentUser);
                    localStorage.setItem('rahmah_is_student', JSON.stringify(isStudentUser));
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        };

        checkStudentStatus();
    }, [user, axiosPublic]);

    return [isStudent, loading];
};

export default useStudent;