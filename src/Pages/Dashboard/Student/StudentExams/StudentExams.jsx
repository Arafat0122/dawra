import { useState } from "react";
import { studentExamsData } from "../../../../assets/devAuth";
import { FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

const StudentExams = () => {
    const [activeTab, setActiveTab] = useState("active"); // 'upcoming', 'active', 'previous'

    const getStatusStyle = (status) => {
        switch (status) {
            case "Pass": return "bg-green-50 text-green-700";
            case "Fail": return "bg-red-50 text-red-700";
            case "Active": return "bg-blue-50 text-blue-700";
            case "Upcoming": return "bg-amber-50 text-amber-700";
            default: return "bg-gray-50 text-gray-500";
        }
    };

    const tabs = [
        { key: "active", label: "Active Exams" },
        { key: "upcoming", label: "Upcoming Exams" },
        { key: "previous", label: "Previous Exams" },
    ];

    const exams = {
        upcoming: studentExamsData.upcoming,
        active: studentExamsData.active,
        previous: studentExamsData.previous,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 animate-in fade-in duration-500">

            <header className="mb-8">
                <h2 className="text-4xl font-black text-brand-navy">Exams & Results</h2>
                <p className="text-gray-500 font-medium mt-2">
                    View all your upcoming, active, and previous exams along with results and teacher remarks.
                </p>
            </header>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-100 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-6 py-2 text-sm font-bold transition-all ${activeTab === tab.key
                            ? "border-b-2 border-brand-blue text-brand-blue"
                            : "text-gray-400 hover:text-brand-navy"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Exams List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams[activeTab].map((exam) => (
                    <div key={exam.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-black uppercase px-3 py-1 rounded-lg bg-brand-light text-brand-blue">{exam.subject}</span>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(exam.status)}`}>
                                {exam.status.toUpperCase()}
                            </span>
                        </div>

                        {/* Exam Name */}
                        <h3 className="text-lg font-bold text-brand-navy mb-2 line-clamp-2">
                            {exam.examName}
                        </h3>

                        {/* Time */}
                        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                            <FiClock /> {exam.startTime} → {exam.endTime}
                        </div>

                        {/* Marks & Teacher Remark */}
                        {activeTab === "previous" && (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Marks: <span className="font-bold">{exam.marks}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Result Status: <span className={`font-bold ${exam.resultStatus === "Pass" ? "text-green-700" : "text-red-700"}`}>{exam.resultStatus}</span>
                                </p>
                                <p className="text-sm text-gray-600 italic">Teacher Remark: {exam.teacherRemark}</p>
                            </div>
                        )}

                        {/* Start / Submit buttons for Active exams */}
                        {activeTab === "active" && (
                            <button className="mt-auto py-3 px-4 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-navy transition-all shadow-lg shadow-brand-blue/20">
                                Start / Submit Exam
                            </button>
                        )}

                    </div>
                ))}

                {exams[activeTab].length === 0 && (
                    <div className="col-span-full py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                        <p className="font-bold text-lg">No exams found</p>
                        <p className="text-sm mt-2">Check back later or try another tab.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default StudentExams;