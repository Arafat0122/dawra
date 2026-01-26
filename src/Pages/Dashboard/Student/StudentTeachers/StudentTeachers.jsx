import { assignedTeachersData } from "../../../../assets/devAuth";
import { FiUser, FiBookOpen, FiStar, FiMessageSquare, FiAward } from "react-icons/fi";

const StudentTeachers = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- HEADER --- */}
            <header className="relative pb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-10 h-1 bg-brand-blue rounded-full"></span>
                    <span className="text-brand-blue font-bold text-xs uppercase tracking-[0.3em]">Faculty</span>
                </div>
                <h2 className="text-4xl font-black text-brand-navy tracking-tight">Your Instructors</h2>
                <p className="text-gray-500 font-medium mt-3 max-w-2xl">
                    Learn from world-class scholars and educators dedicated to your academic and spiritual growth.
                </p>
            </header>

            {/* --- TEACHERS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assignedTeachersData.map((teacher) => (
                    <div
                        key={teacher._id}
                        className="group bg-white rounded-[3rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden"
                    >
                        {/* Decorative Background Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/20 rounded-bl-[5rem] -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>

                        {/* Top: Teacher Profile */}
                        <div className="relative flex flex-col items-center text-center mb-8">
                            <div className="relative mb-4">
                                <img
                                    src={teacher.image}
                                    alt={teacher.name}
                                    className="w-24 h-24 rounded-[2rem] object-cover border-4 border-white shadow-xl group-hover:rotate-3 transition-transform duration-300"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-brand-blue text-white p-2 rounded-xl shadow-lg">
                                    <FiAward size={14} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                                {teacher.name}
                            </h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {teacher.designation}
                            </p>

                            <div className="mt-4 inline-flex items-center gap-2 bg-brand-light px-4 py-1.5 rounded-full">
                                <FiBookOpen size={12} className="text-brand-blue" />
                                <span className="text-[11px] font-black text-brand-blue uppercase">
                                    {teacher.subject}
                                </span>
                            </div>
                        </div>

                        {/* Middle: Professional Feedback/Bio */}
                        <div className="flex-1 bg-gray-50/50 rounded-[2rem] p-6 border border-gray-100 mb-6 relative">
                            <FiMessageSquare className="absolute top-4 right-4 text-gray-200" size={20} />
                            <h4 className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest flex items-center gap-2">
                                <FiStar className="text-amber-400 fill-amber-400" size={10} />
                                Mentor's Note
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-4">
                                "{teacher.feedback || "Committed to excellence in education and providing a supportive learning environment for every student."}"
                            </p>
                        </div>

                        {/* Bottom: Internal Action (No Contact Info) */}
                        <button className="w-full py-4 bg-brand-navy text-white rounded-[1.5rem] text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-blue transition-all shadow-lg shadow-brand-navy/10 active:scale-95">
                            <FiUser size={16} /> View Academic Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentTeachers;