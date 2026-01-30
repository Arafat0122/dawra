import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { FiUser, FiMail, FiBookOpen, FiActivity, FiEye, FiShieldOff, FiCheckCircle } from "react-icons/fi";

const DawraAdmin = () => {
    const axiosPublic = useAxiosPublic();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all Dawra enrollments
    const fetchRegistrations = async () => {
        try {
            const res = await axiosPublic.get("/dawra");
            if (res.data.success) {
                setRegistrations(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching Dawra registrations:", err);
            Swal.fire("Error", "Failed to fetch Dawra registrations", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    // Toggle status with double confirmation
    const toggleStatus = async (user) => {
        const newStatus = user.status === "active" ? "blocked" : "active";

        const firstConfirm = await Swal.fire({
            title: `Are you sure?`,
            text: `You are about to change status of ${user.displayName} to ${newStatus}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, continue",
        });

        if (!firstConfirm.isConfirmed) return;

        const secondConfirm = await Swal.fire({
            title: "Please confirm again",
            text: `This will set the user status to ${newStatus}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, change it",
        });

        if (!secondConfirm.isConfirmed) return;

        // Update backend
        try {
            const res = await axiosPublic.patch(`/dawra/${user.userId}/status`, { status: newStatus });
            if (res.data.success) {
                Swal.fire("Success", res.data.message, "success");
                // Refresh table
                fetchRegistrations();
            }
        } catch (err) {
            console.error("Error updating status:", err);
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100">
            {/* Table Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dawra Enrollments</h2>
                    <p className="text-slate-500 text-sm">Manage student applications and account statuses.</p>
                </div>
                <div className="bg-sky-50 text-sky-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                    Total: {registrations.length} Students
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-slate-400 text-[11px] uppercase tracking-[0.2em] text-left">
                            <th className="px-6 py-3 font-black">Student Details</th>
                            <th className="px-6 py-3 font-black">Education</th>
                            <th className="px-6 py-3 font-black text-center">Current Status</th>
                            <th className="px-6 py-3 font-black text-right">Administrative Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((user) => (
                            <tr key={user.userId} className="group bg-white hover:bg-slate-50 transition-all duration-200 shadow-sm border border-slate-100">
                                {/* Name & Email */}
                                <td className="px-6 py-4 rounded-l-2xl border-y border-l border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                                            {user.displayName?.charAt(0) || 'S'}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900">{user.displayName}</div>
                                            <div className="text-xs text-slate-400 flex items-center gap-1">
                                                <FiMail className="text-[10px]" /> {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Education */}
                                <td className="px-6 py-4 border-y border-slate-100">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <FiBookOpen className="text-sky-500" />
                                        {user.currentStudy || "Not Specified"}
                                    </div>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-4 border-y border-slate-100 text-center">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${user.status === "active"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-rose-50 text-rose-600"
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${user.status === "active" ? "bg-emerald-500" : "bg-rose-500"}`} />
                                        {user.status || "active"}
                                    </span>
                                </td>

                                {/* Action Buttons */}
                                <td className="px-6 py-4 rounded-r-2xl border-y border-r border-slate-100 text-right">
                                    <div className="flex justify-end gap-2">
                                        {/* View All Data Button */}
                                        <button
                                            onClick={() => window.location.href = `/admin/user/${user.userId}`}
                                            className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-sky-600 hover:text-white transition-all group/btn flex items-center gap-2 px-4 text-xs font-bold"
                                            title="View Full Profile"
                                        >
                                            <FiEye size={16} />
                                            <span>View Details</span>
                                        </button>

                                        {/* Toggle Status Button */}
                                        <button
                                            onClick={() => toggleStatus(user)}
                                            className={`p-2 rounded-lg transition-all flex items-center gap-2 px-4 text-xs font-bold ${user.status === "active"
                                                    ? "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                                                    : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                                                }`}
                                        >
                                            {user.status === "active" ? (
                                                <><FiShieldOff size={16} /> Block</>
                                            ) : (
                                                <><FiCheckCircle size={16} /> Activate</>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DawraAdmin;