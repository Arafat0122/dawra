import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiChevronRight } from "react-icons/fi";

// Same dummy auth for testing
const dummyAuth = {
    isLoggedIn: true,
    user: {
        name: "Arafat",
        email: "arafat@gmail.com",
        role: "student",
    },
    isDawraEnrolled: true,
};

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const activeClass = "text-brand-blue relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-brand-blue transition-all duration-300";
    const inactiveClass = "text-brand-navy hover:text-brand-blue transition-all duration-300";

    const primaryAction = () => {
        if (!dummyAuth.isLoggedIn) return { to: "/apply", label: "Enroll Now" };
        if (dummyAuth.isLoggedIn && !dummyAuth.isDawraEnrolled) return { to: "/apply", label: "Apply for Dawra" };
        return { to: "/dashboard", label: "Dashboard" };
    };

    const cta = primaryAction();

    return (
        <>
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">

                    {/* Logo Area */}
                    <NavLink to="/" className="flex items-center group">
                        <img
                            src="/Rahmah-Institute.png"
                            alt="Logo"
                            className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                        />
                    </NavLink>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-10 font-heading font-semibold items-center">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/teachers", label: "Shuyukh" },
                            { to: "/about", label: "About" },
                            { to: "/contact", label: "Contact" },
                        ].map(({ to, label }) => (
                            <li key={to}>
                                <NavLink to={to} className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}

                        {/* Primary Button */}
                        <li>
                            <NavLink
                                to={cta.to}
                                className="bg-brand-navy text-white px-7 py-2.5 rounded-full font-heading font-bold text-sm hover:bg-brand-blue shadow-lg shadow-brand-navy/10 transition-all duration-300"
                            >
                                {cta.label}
                            </NavLink>
                        </li>
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={toggleDrawer}
                        className="md:hidden p-2 rounded-lg bg-gray-50 text-brand-navy text-2xl"
                    >
                        {drawerOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* --- MODERN DRAWER --- */}
            <div
                className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl transform transition-all duration-500 ease-in-out z-[60] flex flex-col ${drawerOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer Header: User Profile */}
                <div className="bg-brand-navy p-8 text-white relative">
                    <button onClick={toggleDrawer} className="absolute top-4 right-4 text-white/50 hover:text-white">
                        <FiX size={24} />
                    </button>
                    <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center mb-4 border border-brand-blue/30">
                        <FiUser size={32} className="text-brand-blue" />
                    </div>
                    {dummyAuth.isLoggedIn ? (
                        <div>
                            <p className="font-heading font-bold text-lg">{dummyAuth.user.name}</p>
                            <p className="text-xs text-white/60">{dummyAuth.user.email}</p>
                        </div>
                    ) : (
                        <p className="font-heading font-bold text-lg text-white">Guest User</p>
                    )}
                </div>

                {/* Drawer Links */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {[
                        { to: "/", label: "Home" },
                        { to: "/teachers", label: "Shuyukh" },
                        { to: "/about", label: "About" },
                        { to: "/contact", label: "Contact" },
                    ].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setDrawerOpen(false)}
                            className={({ isActive }) => `
                                flex items-center justify-between p-4 rounded-xl font-heading font-semibold transition-all
                                ${isActive ? "bg-brand-blue/5 text-brand-blue" : "text-brand-dark hover:bg-gray-50"}
                            `}
                        >
                            {label}
                            <FiChevronRight className="opacity-30" />
                        </NavLink>
                    ))}
                </nav>

                {/* Drawer Footer CTA */}
                <div className="p-6 border-t border-gray-100">
                    <NavLink
                        to={cta.to}
                        onClick={() => setDrawerOpen(false)}
                        className="flex justify-center items-center w-full bg-brand-blue text-white py-4 rounded-2xl font-heading font-bold hover:bg-brand-navy transition-colors"
                    >
                        {cta.label}
                    </NavLink>
                </div>
            </div>

            {/* Darkened Overlay */}
            {drawerOpen && (
                <div
                    onClick={toggleDrawer}
                    className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-50 transition-opacity duration-500"
                />
            )}
        </>
    );
};

export default Navbar;