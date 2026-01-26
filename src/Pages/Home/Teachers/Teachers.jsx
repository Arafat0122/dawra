import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBook, FiChevronRight, FiX, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { teachersData } from "../../../assets/teacher";

const Teachers = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const displayTeachers = teachersData.slice(0, 4);

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

                    {/* Optional: Right side "Explore" link to balance the left-heavy text */}
                    <Link to="/teachers" className="hidden md:flex items-center gap-4 text-sky-900 font-bold text-sm tracking-widest group">
                        FULL DIRECTORY
                        <span className="w-12 h-12 rounded-full border border-sky-200 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                            <FiChevronRight size={20} />
                        </span>
                    </Link>
                </div>

                {/* --- ARCHWAY GALLERY: Floating & Layered --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {displayTeachers.map((t, i) => (
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
                                <div className="absolute bottom-0 left-0 w-full p-8 text-center text-white">
                                    <h3 className="text-2xl font-serif mb-1 group-hover:text-sky-200 transition-colors">
                                        {t.name}
                                    </h3>
                                    <p className="text-sky-300 text-[10px] uppercase tracking-[0.2em] font-black">
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedTeacher(null)}
                            className="absolute inset-0 bg-sky-950/40 backdrop-blur-xl"
                        />

                        <motion.div
                            layoutId={`teacher-${selectedTeacher.name}`}
                            className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-3xl overflow-hidden flex flex-col lg:flex-row h-fit max-h-[90vh]"
                        >
                            {/* Visual Side with Arch Masking */}
                            <div className="lg:w-1/2 relative bg-sky-50 p-8 flex items-center justify-center">
                                <div className="w-full h-[400px] lg:h-[500px] rounded-t-full rounded-b-2xl overflow-hidden border-8 border-white shadow-lg">
                                    <img src={selectedTeacher.profilePhoto} className="w-full h-full object-cover" alt="" />
                                </div>
                            </div>

                            {/* Textual Side */}
                            <div className="lg:w-1/2 p-10 lg:p-16 overflow-y-auto">
                                <button
                                    onClick={() => setSelectedTeacher(null)}
                                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-sky-600 transition-colors"
                                >
                                    <FiX size={24} />
                                </button>

                                <div className="mb-12">
                                    <span className="text-sky-600 font-black text-[10px] uppercase tracking-[0.3em]">Distinguished Faculty</span>
                                    <h2 className="text-5xl font-serif text-slate-900 mt-2">{selectedTeacher.name}</h2>
                                    <p className="text-slate-400 italic mt-2">{selectedTeacher.designation}</p>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <h4 className="flex items-center gap-3 text-sky-900 font-bold uppercase text-[10px] tracking-[0.2em] mb-6">
                                            <FiBook className="text-sky-500" /> Academic Lineage
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            {Object.entries(selectedTeacher.education).map(([key, val], idx) => (
                                                <div key={idx} className="group p-4 rounded-2xl bg-sky-50/50 border border-sky-100 hover:bg-white hover:shadow-md transition-all">
                                                    <span className="block text-[9px] text-sky-400 font-black uppercase mb-1">{key}</span>
                                                    <span className="text-slate-700 font-medium leading-relaxed">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-12 w-full py-5 bg-sky-600 text-white rounded-2xl font-bold shadow-lg shadow-sky-600/20 hover:bg-sky-700 transition-all transform hover:-translate-y-1">
                                    Inquire About Courses
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Teachers;