import { useState, useContext, useMemo } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FiHome, FiBookOpen, FiEdit3, FiFileText, FiBook, FiDollarSign,
    FiUsers, FiUserCheck, FiLayers, FiSettings, FiLogOut,
    FiMenu, FiX
} from "react-icons/fi";
import useTeacher from "../../../Hooks/useTeacher";
import useStudent from "../../../Hooks/useStudent";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import WhatsappButton from "../../../Common/WhatsappButton/WhatsappButton";

/* ---------------- ICON MAP ---------------- */
const iconMap = {
    Overview: <FiHome />,
    Classes: <FiBookOpen />,
    Homework: <FiEdit3 />,
    "Exams & Results": <FiFileText />,
    Exams: <FiFileText />,
    "Books & PDFs": <FiBook />,
    "Upload Books": <FiBook />,
    Payments: <FiDollarSign />,
    Students: <FiUsers />,
    "My Students": <FiUsers />,
    "My Teachers": <FiUserCheck />,
    Teachers: <FiUserCheck />,
    Subjects: <FiLayers />,
    Settings: <FiSettings />,
};

/* ---------------- SIDEBAR LINKS ---------------- */
const sidebarLinks = {
    student: [
        { name: "Overview", path: "/dashboard" },
        { name: "Classes", path: "/dashboard/classes" },
        { name: "Homework", path: "/dashboard/homework" },
        { name: "My Teachers", path: "/dashboard/my-teachers" },
        { name: "Exams & Results", path: "/dashboard/exams" },
        { name: "Books & PDFs", path: "/dashboard/books" },
        { name: "Payments", path: "/dashboard/payments" },
    ],
    teacher: [
        { name: "Overview", path: "/dashboard" },
        { name: "My Students", path: "/dashboard/my-students" },
        { name: "Classes", path: "/dashboard/class-management" },
        { name: "Homework", path: "/dashboard/homework-management" },
        { name: "Exams", path: "/dashboard/manage-exams" },
        { name: "Upload Books", path: "/dashboard/books-management" },
    ],
    admin: [
        { name: "Overview", path: "/dashboard" },
        { name: "Students", path: "/dashboard/students" },
        { name: "Teachers", path: "/dashboard/teachers" },
        { name: "Subjects", path: "/dashboard/subjects" },
        { name: "Payments", path: "/dashboard/payments" },
        { name: "Settings", path: "/dashboard/settings" },
    ],
};

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isAdmin, adminLoading] = useAdmin();
    const [isTeacher, teacherLoading] = useTeacher();
    const [isStudent, studentLoading] = useStudent();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const loading = adminLoading || teacherLoading || studentLoading;

    /* --------- DERIVE ROLE ONCE --------- */
    const role = useMemo(() => {
        if (isAdmin) return "admin";
        if (isTeacher) return "teacher";
        if (isStudent) return "student";
        return null;
    }, [isAdmin, isTeacher, isStudent]);

    const links = role ? sidebarLinks[role] : [];

    const activeLink =
        "flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20";
    const inactiveLink =
        "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-brand-light hover:text-brand-navy";

    const handleLogout = async () => {
        await logOut();
        navigate("/login");
    };

    if (loading) {
        return <div className="p-10">Loading dashboard...</div>;
    }

    return (
        <div className="min-h-screen flex bg-brand-light">
            <WhatsappButton />

            {/* ---------- DESKTOP SIDEBAR ---------- */}
            <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen">
                <div className="p-8">
                    <Link to={'/'}>
                        <img src="/Rahmah-Institute.png" alt="Logo" className="h-10 mb-6" />
                    </Link>
                    <div className="p-4 rounded-2xl bg-brand-navy text-white">
                        <p className="text-xs opacity-70 uppercase tracking-widest font-bold">
                            Portal
                        </p>
                        <h2 className="text-lg font-bold capitalize">
                            {role} Panel
                        </h2>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {links.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                isActive ? activeLink : inactiveLink
                            }
                        >
                            <span className="text-xl">{iconMap[item.name]}</span>
                            <span className="font-semibold">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold"
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            {/* ---------- MAIN CONTENT ---------- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* HEADER */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-6 sticky top-0 z-40">
                    <div>
                        <h1 className="text-xl font-bold text-brand-navy">
                            Assalamu Alaikum, {user?.displayName || user?.name}
                        </h1>
                        <p className="text-xs text-gray-400 capitalize">
                            {role} Dashboard
                        </p>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg bg-brand-light"
                    >
                        {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </header>

                <main className="flex-1 p-4 md:p-10 pb-24">
                    <Outlet />
                </main>
            </div>

            {/* ---------- MOBILE DRAWER ---------- */}
            <div className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? "" : "pointer-events-none"}`}>
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <div className={`absolute right-0 top-0 h-full w-4/5 bg-white p-6 transition-transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <nav className="space-y-2">
                        {links.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? activeLink : inactiveLink
                                }
                            >
                                {iconMap[item.name]} {item.name}
                            </NavLink>
                        ))}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold mt-6"
                        >
                            <FiLogOut /> Logout
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;