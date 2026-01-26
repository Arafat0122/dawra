import { motion } from "framer-motion"; // Add this line to fix the error
import { FiBookOpen, FiStar, FiAward } from "react-icons/fi";
import TeachersPage from "../TeachersPage/TeachersPage";

const About = () => {
    return (
        <main className="min-h-screen bg-[#FCFDFB] relative overflow-hidden">
            {/* --- SPIRITUAL BACKGROUND ELEMENTS --- */}
            <div className="absolute top-0 left-0 w-full h-64 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] opacity-5 pointer-events-none" />

            {/* --- HERO SECTION --- */}
            <section className="relative max-w-6xl mx-auto pt-24 pb-16 px-6 text-center">

                {/* Quranic Ayah Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block mb-8"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-3xl md:text-5xl font-serif text-sky-800 mb-4 tracking-widest leading-loose">
                            رَبِّ زِدْنِي عِلْمًا
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="h-[1px] w-12 bg-sky-200"></span>
                            <p className="text-sky-600 text-xs font-bold uppercase tracking-[0.2em]">
                                "My Lord, increase me in knowledge"
                            </p>
                            <span className="h-[1px] w-12 bg-sky-200"></span>
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 mb-8 tracking-tight italic">
                    Dawrah <span className="text-sky-600">Hadith</span>
                </h1>

                {/* Hadith Quote Box */}
                <div className="relative max-w-4xl mx-auto bg-white border border-sky-100 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-sky-100/50 mb-16">
                    <FiStar className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-500 bg-white p-1 rounded-full text-4xl border border-sky-100" />

                    <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-light italic mb-6">
                        “Whoever follows a path in the pursuit of knowledge, <br className="hidden md:block" />
                        <span className="text-sky-600 font-semibold underline decoration-yellow-400 underline-offset-8">
                            Allah will make a path to Jannah easy for him.
                        </span>”
                    </p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">— Sahih Muslim</p>
                </div>

                {/* Course Narrative Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-20">
                    <div className="space-y-4 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-sky-800 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100">
                            <FiBookOpen size={24} />
                        </div>
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">Classical Authority</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            A rigorous one-year journey through the Sihah al-Sittah, mastered via traditional Sanad and authentic transmission.
                        </p>
                    </div>

                    <div className="space-y-4 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-sky-800 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100">
                            <FiAward size={24} />
                        </div>
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">Spiritual Legacy</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Beyond academic study, we focus on Tazkiyah (purification) and building Prophetic character in every student.
                        </p>
                    </div>

                    <div className="space-y-4 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-sky-800 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-sky-100">
                            <FiStar size={24} />
                        </div>
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">Modern Impact</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Bridging ancient wisdom with contemporary challenges to empower future scholars and community leaders.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- FACULTY SECTION --- */}
            <section className="pt-16">
                <TeachersPage />
            </section>
        </main>
    );
};

export default About;