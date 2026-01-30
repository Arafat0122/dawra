import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiChevronRight, FiX, FiInfo, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { teachersData } from "../../assets/teacher";

const TeachersPage = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeachers = teachersData.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-24 bg-[#F0F7FF] relative overflow-hidden">
            {/* Decorative Sky Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HEADER: Uplifting & Scholarly --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
                    <div className="relative pl-8 md:pl-12 border-l-2 border-sky-100">
                        {/* Decorative Floating Icon */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-[#F0F7FF]" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="mb-4"
                        >
                            <span className="text-sky-700 font-bold tracking-[0.3em] uppercase text-[12px]">
                                The Shuyukh
                            </span>
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-[0.9] tracking-tighter">
                            The Chain of <br />
                            <span className="text-sky-600 italic">Noble Guidance</span>
                        </h2>

                        <p className="mt-6 max-w-lg text-slate-500 text-base md:text-lg leading-relaxed font-light">
                            Connecting seekers to the <span className="text-sky-800 font-medium">Sanad</span> of sacred knowledge through our esteemed faculty.
                        </p>
                    </div>

                    <div className="relative w-full lg:max-w-md">
                        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400 z-10" />
                        <input
                            type="text"
                            placeholder="Find a Mentor..."
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/50 backdrop-blur-md border border-white shadow-xl shadow-sky-900/5 focus:ring-2 focus:ring-sky-400 transition-all outline-none placeholder:text-sky-300 font-medium"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- ARCHWAY GALLERY: Floating & Layered --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {filteredTeachers.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedTeacher(t)}
                            className="relative cursor-pointer group"
                        >
                            {/* The Arch Shape with Sky-Blue Glow */}
                            <div className="relative aspect-[4/6] rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white bg-white shadow-2xl shadow-sky-900/10 transition-all duration-500 group-hover:shadow-sky-400/20 group-hover:-translate-y-4">

                                {/* Image Component */}
                                <div className="h-full w-full relative">
                                    <img
                                        src={t.profilePhoto}
                                        alt={t.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Blue Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-sky-900/10 to-transparent opacity-80" />
                                </div>

                                {/* Floating Info Plate */}
                                <div className="absolute bottom-0 left-0 w-full p-6 text-center bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent pt-12">
                                    {/* Name: Bold, Large, and tight leading to handle 2-line names */}
                                    <h3 className="text-2xl md:text-xl font-serif font-bold text-white leading-[1.1] mb-2 drop-shadow-md group-hover:text-sky-300 transition-colors duration-300">
                                        {t.name}
                                    </h3>

                                    {/* Divider: Small visual break to separate the long text */}
                                    <div className="w-8 h-[2px] bg-sky-500 mx-auto mb-3 rounded-full opacity-60" />

                                    {/* Designation: Clamped to 2 lines with tight tracking */}
                                    <p className="text-sky-100/90 text-[10px] md:text-[11px] leading-relaxed uppercase tracking-widest font-bold px-2 line-clamp-2">
                                        {t.designation}
                                    </p>
                                </div>
                            </div>

                            {/* Ornamental Floating Badge */}
                            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-sky-600 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                <FiInfo size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- SKY CTA --- */}
                <div className="mt-24 text-center">
                    <Link
                        to="/apply"
                        className="group inline-flex items-center gap-6 pl-10 pr-4 py-4 rounded-full bg-white border-2 border-sky-100 shadow-xl shadow-sky-900/5 hover:border-sky-400 transition-all"
                    >
                        <span className="text-sky-900 font-bold uppercase tracking-widest text-xs">Begin Your Enrollment</span>
                        <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center group-hover:bg-sky-700 transition-colors">
                            <FiChevronRight size={24} />
                        </div>
                    </Link>
                </div>
            </div>

            {/* --- REFINED MODAL: The Scholarly Cloud --- */}
            <AnimatePresence>
                {selectedTeacher && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTeacher(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        />

                        {/* Modal Card */}
                        <motion.div
                            layoutId={`teacher-${selectedTeacher.name}`}
                            className="relative bg-white w-full h-full md:h-fit md:max-h-[90vh] md:max-w-5xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                        >
                            {/* Fixed Close Button for Mobile Accessibility */}
                            <button
                                onClick={() => setSelectedTeacher(null)}
                                className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-slate-900 hover:bg-white transition-all md:top-8 md:right-8"
                            >
                                <FiX size={20} />
                            </button>

                            {/* Main Scrollable Area */}
                            <div className="flex flex-col md:flex-row w-full overflow-y-auto">

                                {/* 1. Image Section - Now part of the scroll on mobile */}
                                <div className="w-full md:w-1/2 bg-sky-50 flex-shrink-0">
                                    <div className="relative w-full h-[60vh] md:h-full min-h-[400px]">
                                        <img
                                            src={selectedTeacher.profilePhoto}
                                            className="w-full h-full object-cover object-top"
                                            alt={selectedTeacher.name}
                                        />
                                        {/* Decorative Gradient Overlay for Mobile */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-sky-50 via-transparent to-transparent md:hidden" />
                                    </div>
                                </div>

                                {/* 2. Textual Content Side */}
                                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 bg-white">
                                    <div className="mb-8">
                                        <span className="text-sky-600 font-black text-[10px] uppercase tracking-[0.3em]">
                                            Distinguished Faculty
                                        </span>
                                        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mt-2">
                                            {selectedTeacher.name}
                                        </h2>
                                        <p className="text-slate-500 italic mt-2 text-lg">
                                            {selectedTeacher.designation}
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-3 text-sky-900 font-bold uppercase text-[10px] tracking-[0.2em] mb-4">
                                                <FiBook className="text-sky-500" /> Academic Lineage
                                            </h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {Object.entries(selectedTeacher.education).map(([key, val], idx) => (
                                                    <div
                                                        key={idx}
                                                        className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:bg-sky-50 transition-colors"
                                                    >
                                                        <span className="block text-[9px] text-sky-500 font-black uppercase mb-1">
                                                            {key}
                                                        </span>
                                                        <span className="text-slate-700 font-medium leading-relaxed">
                                                            {val}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button className="mt-10 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-sky-600 transition-all shadow-xl shadow-slate-200">
                                        Inquire About Courses
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default TeachersPage;