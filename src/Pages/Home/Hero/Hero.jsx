import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiPlay, FiUsers, FiStar } from "react-icons/fi";

const Hero = () => {
    return (
        <section className="relative bg-[#F8FAFC] px-6 md:px-12 py-20 lg:py-28 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-3xl -mr-64 -mt-64 z-0"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-50/50 rounded-full blur-3xl -ml-32 -mb-32 z-0"></div>

            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 relative z-10">

                {/* --- LEFT: TEXT CONTENT --- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left flex-1"
                >
                    {/* Tiny Top Badge */}
                    <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 px-4 py-2 rounded-full mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-sky-700 uppercase tracking-widest">Admissions Open 2026</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                        Deepen Your <br />
                        <span className="text-sky-600 italic font-serif">Hadith</span> Mastery
                    </h1>

                    <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                        The <span className="font-bold text-slate-800 underline decoration-yellow-400">Dawra Hadith</span> course by Rahmah Institute combines
                        traditional Bangladeshi scholarship with a modern digital learning desk.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                        <Link to="/apply" className="w-full sm:w-auto">
                            <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-sky-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 group">
                                Enroll Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>

                        <button className="flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-slate-600 hover:text-sky-600 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                                <FiPlay className="text-sky-600 fill-sky-600" size={18} />
                            </div>
                            Watch Preview
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-500" />
                            <span className="text-sm font-bold text-slate-500">IJAZA Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiUsers className="text-sky-500" />
                            <span className="text-sm font-bold text-slate-500">1.2k+ Students</span>
                        </div>
                    </div>
                </motion.div>

                {/* --- RIGHT: HERO IMAGE & INTERACTIVE BADGES --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
                >
                    {/* Main Image Wrapper */}
                    <div className="relative group">
                        <img
                            src="/Dawra.png"
                            alt="Student learning"
                            className="relative w-full max-w-[450px] object-contain rounded-[4rem] z-10"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Modern Curved Separator */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                <svg viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[60px] fill-[#F0F7FF]"
                >
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.35C50.6,35.66,135.17,47.81,202,51.64,245.8,54.14,285.69,59,321.39,56.44Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;