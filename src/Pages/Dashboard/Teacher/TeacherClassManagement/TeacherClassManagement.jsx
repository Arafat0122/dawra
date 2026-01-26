import { useState } from "react";
import { teacherClassesFromStudentData } from "../../../../assets/devAuth";
import {
    FiPlus,
    FiUpload,
    FiVideo,
    FiFileText,
    FiClock,
    FiCheckCircle,
    FiX
} from "react-icons/fi";

const TeacherClassManagement = () => {
    const [activeTab, setActiveTab] = useState("today");
    const [showCreate, setShowCreate] = useState(false);

    const [classes, setClasses] = useState({
        today: teacherClassesFromStudentData.today,
        previous: teacherClassesFromStudentData.previous,
    });

    const [newClass, setNewClass] = useState({
        subject: "",
        className: "",
        time: "",
        classType: "Live",
    });

    /* ---------------- COMPLETE CLASS ---------------- */
    const completeClass = (id) => {
        const cls = classes.today.find(c => c.id === id);
        if (!cls) return;

        const completedClass = {
            ...cls,
            status: "Completed",
            canUpload: false,
            uploads: {
                video: "https://www.example.com/videos/class-recording.mp4",
                notes: "Class Notes.pdf",
            },
        };

        setClasses(prev => ({
            today: prev.today.filter(c => c.id !== id),
            previous: [completedClass, ...prev.previous],
        }));
    };

    /* ---------------- CREATE CLASS ---------------- */
    const handleCreateClass = () => {
        if (!newClass.subject || !newClass.className || !newClass.time) return;

        const created = {
            id: `cls_${Date.now()}`,
            date: new Date().toISOString().split("T")[0],
            subject: newClass.subject,
            className: newClass.className,
            time: newClass.time,
            classType: newClass.classType,
            teacher: "Current Teacher",
            notes: "",
            books: [],
            video: null,
            status: "Upcoming",
            uploads: { video: null, notes: null },
            canUpload: true,
        };

        setClasses(prev => ({
            ...prev,
            today: [created, ...prev.today],
        }));

        setNewClass({ subject: "", className: "", time: "", classType: "Live" });
        setShowCreate(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-brand-navy">Class Management</h2>
                    <p className="text-gray-500 font-medium mt-2">
                        Create classes, upload recordings, and manage sessions.
                    </p>
                </div>

                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-navy transition-all"
                >
                    <FiPlus /> Create Class
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-100">
                {["today", "previous"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 font-bold capitalize transition-all ${activeTab === tab
                                ? "border-b-2 border-brand-blue text-brand-blue"
                                : "text-gray-400 hover:text-brand-navy"
                            }`}
                    >
                        {tab} Classes
                    </button>
                ))}
            </div>

            {/* Classes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes[activeTab].map(cls => (
                    <div
                        key={cls.id}
                        className="bg-white rounded-[2.5rem] border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all flex flex-col"
                    >
                        <span className="text-xs font-black uppercase px-3 py-1 rounded-lg bg-brand-light text-brand-blue w-fit">
                            {cls.subject}
                        </span>

                        <h3 className="text-lg font-bold text-brand-navy mt-3">
                            {cls.className}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                            <FiClock /> {cls.time}
                        </div>

                        {cls.notes && (
                            <p className="text-sm italic text-gray-600 mt-3">
                                “{cls.notes}”
                            </p>
                        )}

                        <div className="mt-auto pt-6 space-y-3">
                            {cls.canUpload ? (
                                <button
                                    onClick={() => completeClass(cls.id)}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-navy transition-all"
                                >
                                    <FiUpload /> Upload Video & Complete
                                </button>
                            ) : (
                                <>
                                    {cls.uploads?.video && (
                                        <a
                                            href={cls.uploads.video}
                                            target="_blank"
                                            className="flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 font-bold hover:bg-brand-light"
                                        >
                                            <FiVideo /> View Recording
                                        </a>
                                    )}

                                    {cls.uploads?.notes && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FiFileText /> {cls.uploads.notes}
                                        </div>
                                    )}

                                    <span className="flex items-center gap-2 text-green-600 text-xs font-bold">
                                        <FiCheckCircle /> Completed
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Class Modal */}
            {showCreate && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md space-y-4 relative">
                        <button
                            onClick={() => setShowCreate(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <FiX />
                        </button>

                        <h3 className="text-xl font-black text-brand-navy">Create Class</h3>

                        <input
                            placeholder="Subject"
                            className="w-full p-3 border rounded-xl"
                            value={newClass.subject}
                            onChange={e => setNewClass({ ...newClass, subject: e.target.value })}
                        />

                        <input
                            placeholder="Class Name"
                            className="w-full p-3 border rounded-xl"
                            value={newClass.className}
                            onChange={e => setNewClass({ ...newClass, className: e.target.value })}
                        />

                        <input
                            placeholder="Time (e.g. 10:00 AM - 11:00 AM)"
                            className="w-full p-3 border rounded-xl"
                            value={newClass.time}
                            onChange={e => setNewClass({ ...newClass, time: e.target.value })}
                        />

                        <select
                            className="w-full p-3 border rounded-xl"
                            value={newClass.classType}
                            onChange={e => setNewClass({ ...newClass, classType: e.target.value })}
                        >
                            <option value="Live">Live</option>
                            <option value="Recorded">Recorded</option>
                        </select>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowCreate(false)}
                                className="flex-1 py-3 rounded-xl bg-gray-100 font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateClass}
                                className="flex-1 py-3 rounded-xl bg-brand-blue text-white font-bold"
                            >
                                Create Class
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TeacherClassManagement;