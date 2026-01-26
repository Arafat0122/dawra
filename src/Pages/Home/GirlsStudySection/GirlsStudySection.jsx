import { motion } from "framer-motion";
import { FiShield, FiHome, FiGlobe, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const GirlsStudySection = () => {
    return (
        <section className="relative bg-white py-24 overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-50/50 skew-x-12 translate-x-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* --- LEFT CONTENT --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 bg-sky-100/50 px-4 py-2 rounded-full">
                            <span className="text-xl font-serif text-sky-700">طلب العلم فريضة</span>
                            <span className="w-px h-4 bg-sky-200"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">A Sacred Obligation</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
                            Empowering Sisters <br />
                            <span className="text-sky-600 underline decoration-sky-200 underline-offset-8">With Dignity.</span>
                        </h2>

                        <div className="space-y-8">
                            <FeatureItem
                                icon={<FiShield />}
                                title="Privacy & Pardah"
                                desc="A safe, women-only spiritual environment designed to maintain full privacy and Islamic dignity."
                            />
                            <FeatureItem
                                icon={<FiHome />}
                                title="Learn From Home"
                                desc="Access world-class scholarship without the need to travel, perfectly suited for busy sisters and homemakers."
                            />
                            <FeatureItem
                                icon={<FiGlobe />}
                                title="Global Standards"
                                desc="Education led by graduates of Al-Azhar and Madinah, bridging classical tradition with modern life."
                            />
                        </div>

                        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
                            <Link to="/teachers" className="group bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-sky-600 transition-all shadow-xl shadow-slate-200">
                                Meet Our Scholars
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <p className="text-sm font-medium text-slate-400 max-w-[200px]">
                                Join 500+ sisters learning globally.
                            </p>
                        </div>
                    </motion.div>

                    {/* --- RIGHT IMAGE & QUOTE --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 relative"
                    >
                        {/* Image: Adjusted height for mobile (h-[300px]) vs desktop (h-[600px]) */}
                        <div className="relative z-10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-8 md:border-[16px] border-slate-50 shadow-xl md:shadow-2xl">
                            <img
                                src="/Dawra SiSter.png"
                                alt="Sisters Education"
                                className="w-full h-[300px] md:h-[600px] object-cover"
                            />
                        </div>

                        {/* Floating Hadith Card: Moves relative to the image on mobile to save vertical space */}
                        <div className="relative lg:absolute -mt-16 lg:mt-0 lg:bottom-8 lg:right-8 lg:left-8 z-20 mx-4 lg:mx-0 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-xl">
                            <div className="text-sky-500 mb-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H19.017C21.2261 4 23.017 5.79086 23.017 8V15C23.017 18.866 19.883 22 16.017 22H14.017V21ZM1 15C1 18.866 4.13401 22 8 22H10V21L10 18C10 16.8954 9.10457 16 8 16H5C4.44772 16 4 15.5523 4 15V9C4 8.44772 4.44772 8 5 8H9C9.55228 8 10 7.55228 10 7V5C10 4.44772 9.55228 4 9 4H5C2.79086 4 1 5.79086 1 8V15Z" /></svg>
                            </div>
                            <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed italic">
                                "Seeking knowledge is an obligation upon every Muslim."
                            </p>
                            <p className="text-[9px] font-black text-sky-600 mt-3 uppercase tracking-[0.2em]">
                                — Sunan Ibn Majah
                            </p>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-100/40 rounded-full blur-3xl -z-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

// Helper component for cleaner code
const FeatureItem = ({ icon, title, desc }) => (
    <div className="flex gap-6 group">
        <div className="flex-shrink-0 w-12 h-12 bg-white shadow-lg shadow-sky-100 rounded-2xl flex items-center justify-center text-xl group-hover:bg-sky-600 text-sky-600 group-hover:text-white  transition-all">
            {icon}
        </div>
        <div>
            <h4 className="text-xl font-bold text-slate-900 mb-1">{title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default GirlsStudySection;