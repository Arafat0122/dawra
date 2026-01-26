import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    FiHome, FiBookOpen, FiEdit3, FiFileText, FiBook, FiDollarSign,
    FiUsers, FiUserCheck, FiLayers, FiSettings, FiLogOut, FiMenu, FiX,
    FiUser
} from "react-icons/fi";

// Icon Mapping for Links
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
    "My Teachers": <FiUser />,
    Teachers: <FiUserCheck />,
    Subjects: <FiLayers />,
    Settings: <FiSettings />,
};

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
    // Replace with your actual auth logic
    const user = { name: "Arafat", role: "student" };
    const links = sidebarLinks[user.role];
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const activeLink = "flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20 transition-all duration-300";
    const inactiveLink = "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-brand-light hover:text-brand-navy transition-all duration-300";

    return (
        <div className="min-h-screen flex bg-brand-light font-sans">

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col sticky top-0 h-screen">
                <div className="p-8">
                    <img src="/Rahmah-Institute.png" alt="Logo" className="h-10 w-auto mb-6" />
                    <div className="p-4 rounded-2xl bg-brand-navy text-white">
                        <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Portal</p>
                        <h2 className="text-lg font-heading font-bold capitalize">{user.role} Panel</h2>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {links.map((item) => (
                        <NavLink key={item.path} to={item.path} end className={({ isActive }) => isActive ? activeLink : inactiveLink}>
                            <span className="text-xl">{iconMap[item.name]}</span>
                            <span className="font-semibold">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold">
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
                    <div>
                        <h1 className="text-xl md:text-2xl font-heading font-bold text-brand-navy">
                            Assalamu Alaikum, {user.name}
                        </h1>
                        <p className="text-xs md:text-sm text-gray-400 font-medium">Welcome to your learning journey</p>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg bg-brand-light text-brand-navy"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-10 pb-24 lg:pb-10">
                    <Outlet />
                </main>
            </div>

            {/* --- MOBILE OVERLAY MENU --- */}
            <div className={`fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className={`absolute right-0 top-0 h-full w-4/5 bg-white p-6 shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-8">
                        <img src="/Rahmah-Institute.png" alt="Logo" className="h-8" />
                        <button onClick={() => setIsMobileMenuOpen(false)}><FiX size={24} /></button>
                    </div>
                    <nav className="space-y-2">
                        {links.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => isActive ? activeLink : inactiveLink}
                            >
                                {iconMap[item.name]} {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>

            {/* --- MOBILE BOTTOM NAVIGATION (UX BEST PRACTICE) --- */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                {links.slice(0, 4).map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => isActive ? "text-brand-blue flex flex-col items-center gap-1" : "text-gray-400 flex flex-col items-center gap-1"}
                    >
                        <span className="text-xl">{iconMap[item.name]}</span>
                        <span className="text-[10px] font-bold uppercase">{item.name.split(' ')[0]}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default DashboardLayout;