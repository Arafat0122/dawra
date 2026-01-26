import { motion } from "framer-motion";
import { FiSun, FiMoon, FiCoffee, FiDownload, FiCheckCircle, FiCalendar } from "react-icons/fi";

const DawraRoutineSection = () => {
    return (
        <section className="relative bg-[#F8FAFC] py-24 px-6 overflow-hidden">
            {/* Soft decorative blur */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 -z-10" />

            <div className="max-w-6xl mx-auto">
                {/* --- HEADER --- */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        The <span className="text-sky-600">Daily</span> Rhythm.
                    </h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        A balanced schedule designed to respect the student's time while maintaining 
                        the rigors of traditional Hadith scholarship.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* --- LEFT: SESSIONS TIMELINE (8 Columns) --- */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* Morning Session Card */}
                        <motion.div 
                            whileHover={{ x: 10 }}
                            className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex gap-6 md:gap-10 items-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 group-hover:bg-sky-100 transition-colors" />
                            
                            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-sky-600 text-white rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-sky-200">
                                <FiSun />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <h3 className="text-2xl font-black text-slate-900">Morning Session</h3>
                                    <span className="text-sky-600 font-bold text-sm">9:00 AM – 12:00 PM</span>
                                </div>
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                                    Deep study of <span className="text-slate-900 font-semibold">Sihah al-Sittah</span> and Tafsir. 
                                    Focused academic transmission with expert Shuyukh.
                                </p>
                            </div>
                        </motion.div>

                        {/* Mid-Day Break Divider */}
                        <div className="flex items-center gap-4 px-12 py-2">
                            <FiCoffee className="text-slate-300 text-xl" />
                            <div className="h-px flex-grow bg-slate-100 italic text-[10px] text-slate-400 uppercase tracking-[0.3em]">
                                Mid-Day Break & Dhuhr
                            </div>
                        </div>

                        {/* Afternoon Session Card */}
                        <motion.div 
                            whileHover={{ x: 10 }}
                            className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex gap-6 md:gap-10 items-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-sky-50 transition-colors" />
                            
                            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-slate-200">
                                <FiMoon />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <h3 className="text-2xl font-black text-slate-900">Afternoon Session</h3>
                                    <span className="text-sky-600 font-bold text-sm">2:00 PM – 5:00 PM</span>
                                </div>
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                                    Interactive Q&A, <span className="text-slate-900 font-semibold">Fiqh discussions</span>, 
                                    and practical application of prophetic wisdom in modern contexts.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- RIGHT: WEEKLY SUMMARY (4 Columns) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-sky-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-sky-200 relative overflow-hidden">
                            <FiCalendar className="absolute -bottom-4 -right-4 text-9xl text-white/10" />
                            
                            <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                                <FiCheckCircle /> Weekly Flow
                            </h4>
                            
                            <ul className="space-y-5 relative z-10">
                                <li className="flex justify-between items-center border-b border-white/10 pb-3">
                                    <span className="text-sky-100 text-sm">Friday Holiday</span>
                                    <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">Rest</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-white font-bold">Mock Exams</span>
                                    <span className="text-sky-100 text-xs">Bi-weekly comprehensive testing</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-white font-bold">Parent Sync</span>
                                    <span className="text-sky-100 text-xs">Daily progress & condition tracking</span>
                                </li>
                            </ul>

                            <button className="w-full mt-8 bg-white text-sky-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-50 transition-colors flex items-center justify-center gap-2">
                                <FiDownload /> Full Routine PDF
                            </button>
                        </div>

                        {/* Additional status note */}
                        <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
                            <span className="text-amber-500 text-xl">💡</span>
                            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                                *All class timings are based on GMT+6 (Bangladesh Time). Please adjust for your local time zone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle bottom wave to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-24 fill-white">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C41.4,17.2,123.59,41.4,200.8,51.81A825.26,825.26,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default DawraRoutineSection;