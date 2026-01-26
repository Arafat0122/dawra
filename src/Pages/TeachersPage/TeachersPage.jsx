import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiBookOpen, FiSearch, FiInfo, FiHash } from "react-icons/fi";
import { teachersData } from "../../assets/teacher";

const TeachersPage = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeachers = teachersData.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F0F7FF] py-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HEADER: Left Aligned --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 border-l-2 border-sky-200 pl-8 md:pl-12 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-500 border-4 border-[#F0F7FF]" />

                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-sky-700 font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                        >
                            The Faculty Directory
                        </motion.span>
                        <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight">
                            Our Noble <span className="text-sky-600 italic">Shuyukh</span>
                        </h1>
                        <p className="mt-4 text-slate-500 font-light text-lg">
                            An assembly of scholars dedicated to the transmission of sacred truth.
                        </p>
                    </div>

                    {/* Search Bar: Glassmorphism Style */}
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

                {/* --- TEACHERS GRID: Arch Design --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {filteredTeachers.map((teacher, index) => (
                        <motion.div
                            key={index}
                            layoutId={`card-${teacher.name}`}
                            onClick={() => setSelectedTeacher(teacher)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/6] rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white bg-white shadow-2xl shadow-sky-900/10 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-sky-300/30">
                                {/* Profile Image */}
                                <div className="h-full w-full relative">
                                    <img
                                        src={teacher.profilePhoto}
                                        alt={teacher.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-sky-900/30 to-transparent opacity-90" />
                                </div>

                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 w-full p-8 text-center text-white">
                                    <h3 className="text-xl font-serif mb-1 group-hover:text-sky-200 transition-colors">
                                        {teacher.name}
                                    </h3>
                                    <p className="text-sky-300 text-[10px] uppercase tracking-[0.2em] font-black">
                                        {teacher.designation}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTeachers.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-serif italic text-xl">No scholars found matching your search.</p>
                    </div>
                )}

                {/* --- DETAILED MODAL --- */}
                <AnimatePresence>
                    {selectedTeacher && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setSelectedTeacher(null)}
                                className="absolute inset-0 bg-sky-950/40 backdrop-blur-xl"
                            />

                            <motion.div
                                layoutId={`card-${selectedTeacher.name}`}
                                className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-3xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
                            >
                                {/* Left Side: Profile Image */}
                                <div className="lg:w-1/2 bg-sky-50 p-8 flex items-center justify-center">
                                    <div className="w-full h-[400px] lg:h-[500px] rounded-t-full rounded-b-2xl overflow-hidden border-8 border-white shadow-lg">
                                        <img src={selectedTeacher.profilePhoto} className="w-full h-full object-cover" alt="" />
                                    </div>
                                </div>

                                {/* Right Side: Details */}
                                <div className="lg:w-1/2 p-10 lg:p-16 overflow-y-auto">
                                    <button
                                        onClick={() => setSelectedTeacher(null)}
                                        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-sky-600 transition-colors"
                                    >
                                        <FiX size={24} />
                                    </button>

                                    <div className="mb-10">
                                        <span className="text-sky-600 font-black text-[10px] uppercase tracking-[0.3em]">Verified Sanad Holder</span>
                                        <h2 className="text-5xl font-serif text-slate-900 mt-2">{selectedTeacher.name}</h2>
                                        <p className="text-slate-400 italic mt-2 text-lg">{selectedTeacher.designation}</p>
                                    </div>

                                    <div className="space-y-10">
                                        <section>
                                            <h4 className="flex items-center gap-3 text-sky-900 font-bold uppercase text-[10px] tracking-[0.2em] mb-6">
                                                <FiHash className="text-sky-500" /> Educational Lineage
                                            </h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {Object.entries(selectedTeacher.education).map(([key, val], idx) => (
                                                    <div key={idx} className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 transition-all">
                                                        <span className="block text-[9px] text-sky-400 font-black uppercase mb-1">{key}</span>
                                                        <span className="text-slate-700 font-medium">{val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    <button className="mt-12 w-full py-5 bg-sky-600 text-white rounded-2xl font-bold shadow-lg hover:bg-sky-700 transition-all">
                                        View Full Biography
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TeachersPage;