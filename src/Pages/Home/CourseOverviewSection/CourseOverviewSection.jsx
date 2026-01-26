import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiBook, FiUsers, FiFileText, FiStar, FiHeart } from "react-icons/fi";

const CourseOverviewSection = () => {
    return (
        <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
            {/* Subtle Arabic Geometric Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                
                {/* Header with Ayat */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-sky-600 font-serif text-2xl mb-2 block"
                    >
                        وَقُل رَّبِّ زِدْنِي عِلْمًا
                    </motion.span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Program <span className="text-sky-500 italic">Highlights</span>
                    </h2>
                    <div className="w-16 h-1 bg-sky-200 mx-auto mt-4 rounded-full" />
                </div>

                <div className="space-y-4">
                    {/* --- THE TIMING CARD (Most Important) --- */}
                    <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center"
                    >
                        <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center text-3xl text-sky-600 flex-shrink-0">
                            <FiClock />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Daily Interactive Learning</h3>
                            <p className="text-slate-500 text-sm">9:00 AM — 12:00 PM & 2:00 PM — 5:00 PM</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                                <span className="px-3 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold rounded-full uppercase">Live Zoom Sessions</span>
                                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase underline decoration-amber-200">Friday Holiday</span>
                            </div>
                        </div>
                        <div className="hidden lg:block w-px h-16 bg-slate-100" />
                        <div className="text-center md:text-right">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                            <p className="text-2xl font-black text-sky-600">1 Full Year</p>
                        </div>
                    </motion.div>

                    {/* --- THE FEATURES GRID (Compact) --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeatureCard 
                            icon={<FiUsers />}
                            title="Parental Connection"
                            desc="Daily updates and spiritual coordination with guardians."
                        />
                        <FeatureCard 
                            icon={<FiStar />}
                            title="Mock Exams"
                            desc="Rigorous testing to ensure mastery of the Hadith corpus."
                        />
                        <FeatureCard 
                            icon={<FiFileText />}
                            title="Digital Library"
                            desc="Complete Sihah al-Sittah provided in high-quality PDFs."
                        />
                        <FeatureCard 
                            icon={<FiHeart />}
                            title="24/7 Mentorship"
                            desc="Direct access to Shuyukh for personal and academic growth."
                        />
                    </div>

                    {/* --- THE SYLLABUS CTA --- */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-8 bg-slate-900 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white text-xl">
                                <FiBook />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Ready to see the curriculum?</h4>
                                <p className="text-slate-400 text-xs">Download the complete week-by-week Dawrah Hadith syllabus.</p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-sky-900/20">
                            Download Syllabus
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex gap-5 items-start hover:shadow-md transition-shadow">
        <div className="text-2xl text-sky-500 mt-1">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-slate-900 mb-1 leading-tight">{title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default CourseOverviewSection;