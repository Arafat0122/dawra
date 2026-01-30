import { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiChevronRight, FiLogOut, FiLayout, FiChevronDown } from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider";
import useDawraEnroll from "../../Hooks/useDawraEnroll";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [pcMenuOpen, setPcMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, logOut } = useContext(AuthContext);
    const menuRef = useRef(null);

    const { isEnrolled, loading: dawraLoading } = useDawraEnroll();

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setPcMenuOpen(false);
        };
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDrawerOpen(false);
        setPcMenuOpen(false);
    }, [location]);

    const activeClass = "text-sky-600 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-sky-600 transition-all duration-300";
    const inactiveClass = "text-slate-600 hover:text-sky-600 transition-all duration-300";

    // Determine CTA button based on user and Dawra enrollment
    const getCTA = () => {
        if (!user) return { to: "/login", label: "Enroll Now" };
        if (user && !dawraLoading && !isEnrolled) return { to: "/apply", label: "Apply for Dawra" };
        if (user && !dawraLoading && isEnrolled) return { to: "/dashboard", label: "Dashboard" };
        return { to: "#", label: "Checking..." }; // while loading
    };

    const cta = getCTA();

    return (
        <>
            <nav className={`fixed w-full z-[20] transition-all duration-500 ${scrolled ? "top-2 px-4" : "top-0 px-0"}`}>
                <div className={`mx-auto transition-all duration-500 flex items-center justify-between ${scrolled
                    ? "max-w-6xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 px-8 h-16"
                    : "max-w-7xl bg-transparent px-6 h-20"
                    }`}>

                    {/* LOGO */}
                    <NavLink to="/" className="flex items-center group">
                        <img src="/Rahmah-Institute.png" alt="Logo" className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105" />
                    </NavLink>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center space-x-10">
                        <ul className="flex space-x-8 font-bold text-[13px] uppercase tracking-[1px]">
                            {[{ to: "/", label: "Home" }, { to: "/teachers", label: "Shuyukh" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map(({ to, label }) => (
                                <li key={to}>
                                    <NavLink to={to} className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* User Profile / CTA */}
                        {/* User Profile / CTA */}
                        {user ? (
                            !dawraLoading && !isEnrolled ? (
                                // User logged in but NOT enrolled → show Apply button
                                <NavLink
                                    to="/apply"
                                    className="bg-slate-900 text-white px-7 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-sky-600 transition-all shadow-lg shadow-slate-200"
                                >
                                    Apply for Dawra
                                </NavLink>
                            ) : (
                                // User logged in AND enrolled → show profile dropdown
                                <div className="relative" ref={menuRef}>
                                    <button
                                        onClick={() => setPcMenuOpen(!pcMenuOpen)}
                                        className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm">
                                            {user.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-sky-100 flex items-center justify-center text-sky-600"><FiUser size={14} /></div>}
                                        </div>
                                        <FiChevronDown className={`text-slate-400 transition-transform ${pcMenuOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    <div className={`absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 transition-all duration-300 origin-top-right ${pcMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                                        <div className="px-4 py-3 border-b border-slate-50 mb-2">
                                            <p className="text-xs font-black text-slate-900 truncate">{user.displayName}</p>
                                            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                                        </div>
                                        <NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-all">
                                            <FiLayout size={16} /> Dashboard
                                        </NavLink>
                                        <button onClick={logOut} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all mt-1">
                                            <FiLogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )
                        ) : (
                            // User NOT logged in → show Login / Enroll
                            <NavLink
                                to="/login"
                                className="bg-slate-900 text-white px-7 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-sky-600 transition-all shadow-lg shadow-slate-200"
                            >
                                Enroll Now
                            </NavLink>
                        )}
                    </div>

                    {/* MOBILE MENU TRIGGER */}
                    <button onClick={toggleDrawer} className="md:hidden flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-50 border border-slate-100">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                            {user?.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" /> : <FiUser size={16} />}
                        </div>
                        <FiMenu size={18} className="text-slate-600" />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-500 z-[60] flex flex-col ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>

                {/* Drawer Header */}
                <div className="bg-slate-900 p-8 text-white relative">
                    <button onClick={toggleDrawer} className="absolute top-4 right-4 text-white/40 hover:text-white"><FiX size={24} /></button>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/10 overflow-hidden shadow-inner">
                        {user?.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" /> : <FiUser size={32} className="text-sky-400" />}
                    </div>
                    {user ? (
                        <div>
                            <p className="font-bold text-lg leading-tight">{user.displayName}</p>
                            <p className="text-xs text-white/50 truncate mt-1">{user.email}</p>
                        </div>
                    ) : <p className="font-bold text-lg">Guest Visitor</p>}
                </div>

                {/* Drawer Links & CTA */}
                <div className="flex-1 p-6 flex flex-col justify-start space-y-3">
                    {/* Navigation Links */}
                    {[{ to: "/", label: "Home" }, { to: "/teachers", label: "Shuyukh" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `flex items-center justify-between p-4 rounded-xl font-semibold transition-all ${isActive ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            {label} <FiChevronRight className="opacity-20" />
                        </NavLink>
                    ))}

                    {/* Dawra CTA */}
                    {!user && (
                        <NavLink
                            to="/login"
                            className="flex justify-center items-center w-full bg-sky-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-colors shadow-lg shadow-sky-100"
                        >
                            Enroll Now
                        </NavLink>
                    )}
                    {user && !dawraLoading && !isEnrolled && (
                        <NavLink
                            to="/apply"
                            className="flex justify-center items-center w-full bg-sky-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-colors shadow-lg shadow-sky-100"
                        >
                            Apply for Dawra
                        </NavLink>
                    )}
                    {user && !dawraLoading && isEnrolled && (
                        <NavLink
                            to="/dashboard"
                            className="flex justify-center items-center w-full bg-sky-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-colors shadow-lg shadow-sky-100"
                        >
                            Dashboard
                        </NavLink>
                    )}
                </div>

                {/* Sign Out always at bottom */}
                {user && (
                    <div className="p-6 border-t border-gray-100">
                        <button onClick={logOut} className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-all">
                            <FiLogOut /> Sign Out
                        </button>
                    </div>
                )}
            </div>

            {drawerOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-500" />}
        </>
    );
};

export default Navbar;