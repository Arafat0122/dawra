import { motion } from "framer-motion";
import { FiGlobe, FiLock, FiSmartphone, FiAward, FiShield, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const whyUsData = [
    {
        icon: <FiGlobe />,
        title: "Global Faculty",
        desc: "Direct access to international scholars and world-class Shuyukh from various countries."
    },
    {
        icon: <FiSmartphone />,
        title: "Dedicated Mobile App",
        desc: "Classes are conducted via our private app, ensuring seamless learning and student privacy.",
        highlight: true
    },
    {
        icon: <FiLock />,
        title: "Privacy & Purdah",
        desc: "Our platform is designed specifically for sisters to maintain 100% privacy and Purdah."
    },
    {
        icon: <FiAward />,
        title: "Befaqul Madaris Support",
        desc: "Specialized academic guidance for students intending to sit for the Befaq Board Exams."
    },
    {
        icon: <FiShield />,
        title: "Academic Monitoring",
        desc: "A combined supervision model involving expert teacher guidance and parental oversight."
    },
    {
        icon: <FiCheckCircle />,
        title: "Certified Excellence",
        desc: "Receive an official, high-quality certificate upon successful completion of the course."
    }
];

const WhyUsSection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Soft decorative background circles */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-sky-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- SECTION HEADER --- */}
                <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
                    <div>
                        <span className="text-sky-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                            The Rahmah Advantage
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                            Why Choose our <br />
                            <span className="text-sky-600 font-serif italic font-normal">Dawra Hadith?</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 font-medium text-lg max-w-md pb-2 border-l-4 border-sky-100 pl-6">
                        An intensive one-year program covering the Kutub al-Sittah, designed for
                        academic depth and spiritual transformation from the comfort of your home.
                    </p>
                </div>

                {/* --- FEATURE GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyUsData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -8 }}
                            className={`p-10 rounded-[2.5rem] border transition-all duration-300 ${item.highlight
                                ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-sky-200'
                                : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-8 ${item.highlight ? 'bg-sky-500 text-white' : 'bg-white shadow-sm text-sky-600'
                                }`}>
                                {item.icon}
                            </div>

                            <h3 className={`text-xl font-black mb-4 ${item.highlight ? 'text-white' : 'text-slate-900'}`}>
                                {item.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${item.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* --- ADMISSION QUICK INFO --- */}
                <div className="mt-16 p-3 md:p-2 bg-slate-100 rounded-[3rem] inline-flex flex-wrap justify-center items-center gap-3 md:gap-8 overflow-hidden">
                    <div className="bg-white px-8 py-4 rounded-[2.5rem] shadow-sm flex items-center gap-4">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Class Starts</span>
                        <span className="text-sky-600 font-black text-lg">15th Shawwal</span>
                    </div>
                    <div className="bg-white px-8 py-4 rounded-[2.5rem] shadow-sm flex items-center gap-4">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Monthly Fee</span>
                        <span className="text-sky-600 font-black text-lg">৳1400</span>
                    </div>
                    <Link to={'/apply'}>
                        <button className="bg-sky-600 text-white px-10 py-4 rounded-[2.5rem] font-black text-md uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors">
                            Enroll Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WhyUsSection;