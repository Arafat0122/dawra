import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useTeacherReviews = (teacherId) => {
    const axiosPublic = useAxiosPublic();

    const [reviews, setReviews] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [reviewedJobs, setReviewedJobs] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!teacherId) {
            setLoading(false);
            return;
        }

        const fetchReviews = async () => {
            try {
                const res = await axiosPublic.get("/bookings");
                const allBookings = Array.isArray(res.data) ? res.data : [];

                // 1️⃣ Only this teacher’s bookings
                const teacherBookings = allBookings.filter(
                    b => b?.teacherId === teacherId
                );

                // 2️⃣ Only bookings with student reviews
                const bookingsWithReviews = teacherBookings.filter(
                    b =>
                        b?.studentReview &&
                        typeof b.studentReview.rating === "number" &&
                        b.studentReview.comment?.trim()
                );

                // 3️⃣ Build safe review objects
                const formattedReviews = await Promise.all(
                    bookingsWithReviews.map(async (b) => {
                        let student = null;

                        if (b?.userId) {
                            try {
                                const userRes = await axiosPublic.get(`/users/${b.userId}`);
                                student = userRes.data || null;
                            } catch {
                                student = null; // fail silently
                            }
                        }

                        return {
                            rating: b.studentReview.rating,
                            comment: b.studentReview.comment,
                            date: b.studentReview.date || b.createdAt,
                            bookingId: b._id,
                            customOrderId: b.customOrderId || null,
                            studentId: b.userId || null,
                            student,
                        };
                    })
                );

                // 4️⃣ Sort newest first
                formattedReviews.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );

                setReviews(formattedReviews);
                setTotalJobs(teacherBookings.length);
                setReviewedJobs(bookingsWithReviews.length);
            } catch (err) {
                console.error("Failed to fetch teacher reviews:", err);
                setReviews([]);
                setTotalJobs(0);
                setReviewedJobs(0);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [teacherId, axiosPublic]);

    return { reviews, totalJobs, reviewedJobs, loading };
};

export default useTeacherReviews;